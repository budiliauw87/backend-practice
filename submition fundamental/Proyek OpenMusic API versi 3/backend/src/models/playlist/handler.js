class PlaylistHandler {

  //construct class
  constructor(playlistService, playlistSongService, songService, actService) {
    this._service = playlistService;
    this._playlistSongService = playlistSongService;
    this._songService = songService;
    this._actService = actService;
  }

  async getPlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylist(credentialId);
    return h.response({
      status: 'success',
      data:{
        playlists
      },
    }).code(200);
  }

  async addPlaylistHandler(request, h) {
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const id = await this._service.addPlaylist(name, credentialId);

    return h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data:{ playlistId: id },
    }).code(201);
  }

  async deletePlaylistHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    //delete all relation data on other table
    await this._service.verifyOwnerPlaylist(playlistId, credentialId);
    await this._playlistSongService.deleteByPlaylist(playlistId);
    await this._service.deletePlaylist(playlistId, credentialId);
    return h.response({
      status: 'success',
      message: 'Playlist berhasil di hapus',
      data:{ playlistId: playlistId },
    }).code(200);
  }

  async getSongPlaylist(request, h){
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    //check playlist has store on db
    await this._service.findPlaylist(playlistId);

    //verify playlist on database
    const playlist = await this._service.verifyPlaylist(playlistId, credentialId);
    playlist.songs = await this._playlistSongService.getSongsPlaylist(playlistId);
    return h.response({
      status: 'success',
      data:{
        playlist : playlist,
      }
    }).code(200);
  }
  async addSongPlaylist(request, h){
    //validation playlistId
    const { playlistId } = request.params;
    const { songId } =  request.payload;
    //verify song on database
    await this._songService.verifySong(songId);
    //verify playlist on database
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylist(playlistId, credentialId);
    await this._playlistSongService.verifySongPlaylist(playlistId, songId);
    //add to playlistsong
    await this._playlistSongService.addSongPlaylist(playlistId, songId);
    const method = 'add';
    await this._actService.addActivities(playlistId, credentialId, songId, method);

    return h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    }).code(201);
  }


  async deleteSongPlaylist(request, h){
    const { playlistId } = request.params;
    const { songId } =  request.payload;
    //verify song on database
    await this._songService.verifySong(songId);
    //verify playlist on database
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylist(playlistId, credentialId);
    //delete song on playlistsong
    await this._playlistSongService.deleteSongPlaylist(playlistId, songId);
    const method = 'delete';
    await this._actService.addActivities(playlistId, credentialId, songId, method);
    return h.response({
      status: 'success',
      message: 'Lagu berhasil di hapus ke playlist',
    }).code(200);
  }

  async activitySongPlaylist(request, h){
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    await this._service.verifyOwnerPlaylist(playlistId, credentialId);
    const activities = await this._actService.getActivities(playlistId);
    return h.response({
      status: 'success',
      message: 'Ok',
      data:{
        playlistId : playlistId,
        activities : activities
      }
    }).code(200);
  }
}

module.exports = PlaylistHandler;