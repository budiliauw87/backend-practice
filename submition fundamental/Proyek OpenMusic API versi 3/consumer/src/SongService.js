const { Pool } = require('pg');

class SongService {
  constructor(){
    this._pool = new Pool();
  }

  async getSongs(playlistId){
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer, songs.year, songs.duration
            FROM playlistsongs 
            LEFT JOIN songs ON playlistsongs.song = songs.id 
            WHERE playlistsongs.playlist=$1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongService;