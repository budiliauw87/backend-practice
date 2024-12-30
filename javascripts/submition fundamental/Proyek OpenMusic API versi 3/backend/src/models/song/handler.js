class SongHandler {

  //construct class
  constructor(service) {
    this._service = service;
  }

  async addSongHandler(request, h) {
    const { title, year, performer, genre, duration, albumId } = request.payload;
    const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId });
    return h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: { 'songId': songId },
    }).code(201);
  }
  async updateSongHandler(request, h) {
    const { songId } = request.params;
    const { title, year, performer, genre, duration } = request.payload;
    await this._service.updateSong(songId, { title, year, performer, genre, duration });
    return h.response({
      status: 'success',
      message: 'lagu berhasil diperbarui',
    }).code(200);
  }
  async getSongHandler(request, h) {
    const query = request.query;
    let pageNumber;
    let title = '', performer = '';
    if ('page' in query && query.page.length > 0) {
      pageNumber = query.page;
    } else {
      pageNumber = 1;
    }

    if ('title' in query && query.title.length > 0) {
      title = query.title.toLowerCase();
    }
    if ('performer' in query && query.performer.length > 0) {
      performer = query.performer.toLowerCase();
    }
    const lagu = await this._service.getAllSong(pageNumber, title, performer);
    return h.response({
      status: 'success',
      data: { songs: lagu },
    }).code(200);
  }

  async getDetailSongHandler(request, h) {
    const { songId } = request.params;
    const song = await this._service.getDetailSong(songId);
    return h.response({
      status: 'success',
      data: { song: song[0] },
    });
  }

  async deleteSongHandler(request, h) {
    const { songId } = request.params;
    await this._service.deleteSong(songId);
    return h.response({
      status: 'success',
      message: 'lagu berhasil dihapus',
    }).code(200);
  }

  async deleteAllSongHandler(request, h) {
    await this._service.deleteAll();
    return h.response({
      status: 'success',
      message: 'lagu berhasil dihapus',
    }).code(201);
  }
}

module.exports = SongHandler;