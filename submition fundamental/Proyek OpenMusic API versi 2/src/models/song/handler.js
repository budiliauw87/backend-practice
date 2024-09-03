const CustomError = require('../../exceptions/CustomError');
class SongHandler {

  //construct class
  constructor(service) {
    this._service = service;

    this.addSongHandler = this.addSongHandler.bind(this);
    this.getSongHandler = this.getSongHandler.bind(this);
    this.getDetailSongHandler = this.getDetailSongHandler.bind(this);
    this.updateSongHandler = this.updateSongHandler.bind(this);
    this.deleteSongHandler = this.deleteSongHandler.bind(this);
    this.deleteAllSongHandler = this.deleteAllSongHandler.bind(this);
  }

  async addSongHandler(request, h) {
    try {
      const { title, year, performer, genre, duration, albumId } = request.payload;
      const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId });
      return h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: { 'songId': songId },
      }).code(201);

    } catch (error) {

      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }

  }
  async updateSongHandler(request, h) {
    try {
      const { songId } = request.params;
      const { title, year, performer, genre, duration } = request.payload;
      await this._service.updateSong(songId, { title, year, performer, genre, duration });
      return h.response({
        status: 'success',
        message: 'lagu berhasil diperbarui',
      }).code(200);
    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: error,
      }).code(500);
    }
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
    try {
      const lagu = await this._service.getAllSong(pageNumber, title, performer);
      return h.response({
        status: 'success',
        data: { songs: lagu },
      }).code(200);
    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }

  }

  async getDetailSongHandler(request, h) {
    const { songId } = request.params;
    try {
      const song = await this._service.getDetailSong(songId);
      return {
        status: 'success',
        data: { song: song[0] },
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }

  }

  async deleteSongHandler(request, h) {
    const { songId } = request.params;
    try {

      await this._service.deleteSong(songId);
      return h.response({
        status: 'success',
        message: 'lagu berhasil dihapus',
      }).code(200);

    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }

  async deleteAllSongHandler(request, h) {
    try {
      await this._service.deleteAll();
      return h.response({
        status: 'success',
        message: 'lagu berhasil dihapus',
      }).code(201);

    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }
}

module.exports = SongHandler;