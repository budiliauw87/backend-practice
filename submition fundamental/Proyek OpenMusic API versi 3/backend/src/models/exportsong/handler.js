const responError = require('../../utils/responError');
class ExportHandler {
  //construct class
  constructor(service, playlistService) {
    this._service = service;
    this._playlistService = playlistService;
    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }
  // Export playlist to mail
  async postExportPlaylistHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      //verify access owner playlist
      //await this._playlistService.verifyOwnerPlaylist(playlistId, credentialId);

      const message = {
        playlistId:playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this._service.sendMessage('export:songs', JSON.stringify(message));
      return h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      }).code(201);

    } catch (error){
      return responError.handleError(error, h);
    }
  }
}

module.exports = ExportHandler;