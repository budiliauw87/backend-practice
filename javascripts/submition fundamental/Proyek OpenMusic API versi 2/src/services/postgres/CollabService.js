const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ClientError = require('../../exceptions/ClientError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CollabService {
  constructor(){
    this._pool = new Pool();
  }

  async addCollab(playlistId, userId){
    const id = `collab-${nanoid(16)}`;
    await this.verifyExistCollab(userId, playlistId);

    const query = {
      text: 'INSERT INTO collaborations VALUES( $1, $2, $3 ) RETURNING id',
      values: [id, playlistId, userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Collaboration added failed!');
    }
    return result.rows[0].id;
  }

  async deleteCollab(playlistId, userId){
    const query = {
      text: `DELETE FROM collaborations 
            WHERE collaborations.playlist=$1 
            AND collaborations.user=$2 RETURNING *`,
      values: [playlistId, userId],
    };
    return await this._pool.query(query);

  }

  async verifyExistCollab(userId, playlistId){
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist=$1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new NotFoundError('playlist not exist!');
    }
  }

  async verifyOwnerPlaylist(playlistId, owner){
    const query = {
      text: 'SELECT owner FROM playlists WHERE id=$1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('playlist not exist!');
    }
    if (result.rows[0].owner !== owner) {
      throw new AuthorizationError('Limited Access playlist', 403);
    }
  }

  async verifyUser(userId){
    const query = {
      text: 'SELECT * FROM users WHERE id=$1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User not exist!');
    }
  }
}

module.exports = CollabService;