const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const ClientError = require('../../exceptions/ClientError');
class LikeService {

  constructor(){
    this._pool = new Pool();
  }

  async addLikeAlbums(user, album){
    const totalLikes = await this.getTotalLikeByUserAndAlbum(user, album);
    if (totalLikes.likes > 0) {
      throw new ClientError('Already like this album!!');
    }
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, user, album],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Gagal menyukai album!!');
    }
  }

  async getTotalLikes(album){
    const query = {
      text: 'SELECT COUNT(*) AS likes FROM user_album_likes WHERE albumid=$1',
      values: [album],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getTotalLikeByUserAndAlbum(user, album){
    const query = {
      text: 'SELECT COUNT(*) AS likes FROM user_album_likes WHERE userid=$1 AND albumid=$2',
      values: [user, album],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteLikeAlbum(user, album){
    const totalLikes = await this.getTotalLikeByUserAndAlbum(user, album);
    if (totalLikes.likes == 0 || totalLikes.likes == '0') {
      throw new ClientError('You not already likes albums!!', 400);
    }
    const query = {
      text: 'DELETE FROM user_album_likes WHERE userid=$1 AND albumid=$2',
      values: [user, album],
    };
    await this._pool.query(query);
  }
}

module.exports = LikeService;