const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const ClientError = require('../../exceptions/ClientError');
class ActService {

  constructor(){
    this._pool = new Pool();
  }

  async getActivities(playlist){
    const query = {
      text: `SELECT users.username, songs.title, activities.action, activities.time  
        FROM activities RIGHT JOIN users ON activities.user = users.id
        RIGHT JOIN songs ON activities.song = songs.id
        WHERE activities.playlist=$1`,
      values: [playlist],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async addActivities(playlist, user, song, method){
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO activities VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlist, user, song, method],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('failed add activity playlist!');
    }
    return id;
  }
}
module.exports = ActService;