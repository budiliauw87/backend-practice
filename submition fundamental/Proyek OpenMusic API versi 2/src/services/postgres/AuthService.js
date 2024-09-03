const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AuthService {

  constructor(){
    this._pool = new Pool();
  }

  async verifyRefreshToken(refreshToken){
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [refreshToken],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length > 0) {
      throw new InvariantError('Invalid token');
    }
  }


  async deleteRefreshToken(refreshToken){
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1 RETURNING *',
      values: [refreshToken],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Failed Deleted token');
    }

  }

  async addRefreshToken(refreshToken){
    const query = {
      text: 'INSERT INTO authentications VALUES($1) RETURNING token',
      values: [refreshToken],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].token) {
      throw new InvariantError('Failed add Token');
    }

    return result.rows[0].token;
  }
}

module.exports = AuthService;