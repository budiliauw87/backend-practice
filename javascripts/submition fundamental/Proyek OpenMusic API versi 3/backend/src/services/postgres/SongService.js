const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');
const { mapDBToModel } = require('../../utils');

class SongService {

  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId, createdAt, updatedAt],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async updateSong(songId, { title, year, performer, genre, duration }) {
    await this.verifySong(songId);
    const updateTime = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5,updated_at=$6 WHERE id=$7 RETURNING id',
      values: [title, year, performer, genre, duration, updateTime, songId],
    };
    await this._pool.query(query);
  }

  async deleteSong(songId) {
    await this.verifySong(songId);
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING *',
      values: [songId],
    };
    await this._pool.query(query);
  }

  async deleteAll() {
    const query = {
      text: 'DELETE FROM songs',
    };
    await this._pool.query(query);
  }

  async findByAlbumId(albumId) {
    const query = {
      text: 'SELECT * FROM songs WHERE album = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModel);
  }

  async getAllSong(pages, title, performer) {
    const limit = 2;
    const offset = (pages - 1) * limit;
    let queryBuilder = 'SELECT id, title, performer FROM songs';

    if (title.length > 0) {
      queryBuilder += ` WHERE LOWER(title) LIKE '%${title}%'`;
    }

    if (performer.length > 0) {
      const operatorQuery = (queryBuilder.includes('WHERE')) ? ' AND' : ' WHERE';
      queryBuilder += `${operatorQuery} LOWER(performer) LIKE '%${performer}%'`;
    }

    queryBuilder += ' ORDER BY id DESC LIMIT $1 OFFSET $2';
    const query = {
      text: queryBuilder,
      values: [limit, offset],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModel);
  }

  async getDetailSong(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id =$1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan', 404);
    }
    return result.rows.map(mapDBToModel);
  }
  //verify song exist on db
  async verifySong(id){
    const query = {
      text: 'SELECT * FROM songs WHERE id =$1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }
}
module.exports = SongService;