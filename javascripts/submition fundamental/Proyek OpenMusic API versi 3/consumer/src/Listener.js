class Listener {
  constructor(songService, mailSender) {
    this._songService = songService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }
  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this._songService.getPlaylist(playlistId);
      const songs = await this._songService.getSongs(playlistId);
      playlist.songs = songs;
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Listener;