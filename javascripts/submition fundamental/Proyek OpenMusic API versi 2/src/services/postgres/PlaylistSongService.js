const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ClientError = require('../../exceptions/ClientError');
const { mapDBToModel } = require('../../utils');
class PlaylistSongService {

  constructor(){
    this._pool = new Pool();
  }
  //get song on playlist
  async getSongsPlaylist(playlistId){
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer 
            FROM playlistsongs LEFT JOIN songs ON playlistsongs.song = songs.id 
            WHERE playlistsongs.playlist=$1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModel);
  }
  //adding song to playlist
  async addSongPlaylist(playlistId, songId){
    const id = `playlistsongs-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistsongs VALUES( $1, $2, $3 ) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Gagal menambahkan lagu ke playlist');
    }
  }

  //verify song exist on playlistsong
  async verifySongPlaylist(playlistId, songId){
    const query = {
      text: 'SELECT * FROM playlistsongs WHERE playlist=$1 AND song=$2',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new ClientError('lagu sudah terdaftar di playlist');
    }
  }
  //delete song on playlist
  async deleteSongPlaylist(playlistId, songId){
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist=$1 AND song=$2 RETURNING *',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ClientError('Gagal menghapus lagu dari playlist');
    }
  }

  //delete by playlistId
  async deleteByPlaylist(playlistId){
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist=$1',
      values: [playlistId],
    };
    await this._pool.query(query);
  }
}

module.exports = PlaylistSongService;