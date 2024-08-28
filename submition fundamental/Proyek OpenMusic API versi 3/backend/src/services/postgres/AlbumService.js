const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const CustomError = require('../../exceptions/CustomError');
const SongService = require('./SongService');
class AlbumService {

  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new CustomError('Album gagal ditambahkan', 400);
    }

    return result.rows[0].id;
  }

  async updateAlbum(albumId, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
      values: [name, year, albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new CustomError('Album gagal diperbarui', 404);
    }

  }

  async getAlbumById(albumId) {
    const query = {
      text: 'SELECT * FROM albums WHERE id=$1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new CustomError('Album tidak ditemukan', 404);
    }
    //adding song

    const songService = new SongService();
    const songs = await songService.findByAlbumId(albumId);

    result.rows[0].songs = songs;
    return result.rows[0];
  }

  async deleteById(albumId) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING *',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new CustomError('Album tidak ditemukan', 404);
    }
  }

  async deleteAll() {
    const query = {
      text: 'DELETE FROM albums',
    };
    await this._pool.query(query);
  }

  async getAllAlbums() {
    const query = {
      text: 'SELECT * FROM albums',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
module.exports = AlbumService;