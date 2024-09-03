class CollabHandler {

  //construct class
  constructor(service) {
    this._service = service;
  }
  async postCollabHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } =  request.payload;
    await this._service.verifyOwnerPlaylist(playlistId, credentialId);
    await this._service.verifyUser(userId);
    const id = await this._service.addCollab(playlistId, userId);
    return h.response({
      status: 'success',
      message: 'Berhasil menambahkan collaborator ',
      data:{
        collaborationId:id
      }
    }).code(201);
  }

  async deleteCollabHandler(request, h) {
    //check token store on db
    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } =  request.payload;
    await this._service.verifyOwnerPlaylist(playlistId, credentialId);
    await this._service.verifyUser(userId);
    const result = await this._service.deleteCollab(playlistId, userId);
    return h.response({
      status: 'success',
      message: 'Berhasil menghapus collaborator!',
      debug : result,
    }).code(200);
  }
}

module.exports = CollabHandler;