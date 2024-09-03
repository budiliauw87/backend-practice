const { Pool } = require('pg');

class SongService {
  constructor(){
    this._pool = new Pool();
  }

  async getSongs(playlistId){
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer 
            FROM playlistsongs LEFT JOIN songs ON playlistsongs.song = songs.id 
            WHERE playlistsongs.playlist=$1`,
      values: [playlistId],
    };
    const songs = await this._pool.query(query);
    return songs.rows;
  }
  async getPlaylist(playlistId){
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id=$1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = SongService;