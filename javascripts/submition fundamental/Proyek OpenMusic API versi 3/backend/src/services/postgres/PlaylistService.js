const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

class PlaylistService {

  constructor(){
    this._pool = new Pool();
  }

  async addPlaylist(name, owner){
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES( $1, $2, $3 ) RETURNING id',
      values: [id, name, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Gagal menambahkan playlist');
    }

    return result.rows[0].id;
  }

  async getPlaylist(credentialId){
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username 
             FROM playlists LEFT JOIN users ON playlists.owner = users.id 
             LEFT JOIN collaborations ON playlists.id = collaborations.playlist 
             WHERE playlists.owner=$1 OR collaborations.user=$2`,
      values: [credentialId, credentialId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  // verify only owner can add collab
  async verifyOwnerPlaylist(playlistId, owner){
    const query = {
      text: 'SELECT * FROM playlists WHERE id=$1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found');
    }
    if (result.rows[0].owner !== owner) {
      throw new AuthorizationError('Limited Access playlist');
    }
  }

  async test(playlistId, owner){
    return { playlistId, owner };
  }
  //verify access playlist
  async verifyPlaylist(playlistId, owner){
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username 
      FROM playlists LEFT JOIN users ON playlists.owner = users.id 
      LEFT JOIN collaborations ON playlists.id = collaborations.playlist 
      WHERE playlists.id=$1 
      AND playlists.owner=$2 
      OR  playlists.id=$3 AND collaborations.user=$4`,
      values: [playlistId, owner, playlistId, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('Limited Access playlist');
    }
    return result.rows[0];
  }

  //find playlist
  async findPlaylist(playlistId){
    const findQuery = {
      text: 'SELECT * FROM playlists WHERE id=$1',
      values: [playlistId],
    };
    const resultFind = await this._pool.query(findQuery);
    if (!resultFind.rows.length) {
      throw new NotFoundError('Playlist not found');
    }
  }


  async deletePlaylist(playlistId, owner){
    //delete playlist activities
    await this._pool.query({
      text: 'DELETE FROM activities WHERE activities.playlist =$1',
      values: [playlistId],
    });
    const query = {
      text: 'DELETE FROM playlists WHERE id =$1 AND owner=$2',
      values: [playlistId, owner],
    };
    await this._pool.query(query);
  }
}

module.exports = PlaylistService;