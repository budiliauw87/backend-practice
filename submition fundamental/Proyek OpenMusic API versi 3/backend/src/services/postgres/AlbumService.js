const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');
const SongService = require('./SongService');
class AlbumService {

  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year, coverUrl }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, year, coverUrl],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ClientError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async updateAlbum(albumId, { name, year, coverUrl }) {
    const query = {
      text: 'UPDATE albums SET name=$1, year=$2, cover_url=$3 WHERE id=$4 RETURNING id',
      values: [name, year, coverUrl, albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album gagal diperbarui');
    }
  }

  async updateAlbumCover(albumId, coverUrl) {
    const query = {
      text: 'UPDATE albums SET cover_url=$1 WHERE id=$2 RETURNING id',
      values: [coverUrl, albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Cover Album gagal diperbarui');
    }
  }

  async getAlbumById(albumId) {
    const query = {
      text: 'SELECT * FROM albums WHERE id=$1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const mapResult = result.rows.map(({
      // eslint-disable-next-line camelcase
      id, name, year, cover_url
    }) => ({
      // eslint-disable-next-line camelcase
      id, name, year, coverUrl:cover_url
    }));

    //adding song
    const songService = new SongService();
    const songs = await songService.findByAlbumId(albumId);

    mapResult[0].songs = songs;
    return mapResult[0];
  }
  async deleteById(albumId) {

    const query = {
      text: 'SELECT * FROM albums WHERE id=$1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const queryDelete = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING *',
      values: [albumId],
    };
    await this._pool.query(queryDelete);
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
    return result.rows.map(({
      // eslint-disable-next-line camelcase
      id, name, year, cover_url,
    }) => ({
      // eslint-disable-next-line camelcase
      id, name, year, coverUrl:cover_url
    }));
  }
}
module.exports = AlbumService;