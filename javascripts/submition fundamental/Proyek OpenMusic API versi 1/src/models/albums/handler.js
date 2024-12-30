const CustomError = require('../../exceptions/CustomError');
class AlbumHandler {

  //construct class
  constructor(service) {
    this._service = service;
    this.addAlbum = this.addAlbum.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.updateAlbum = this.updateAlbum.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async addAlbum(request, h) {
    try {
      const { name, year } = request.payload;
      const albumId = await this._service.addAlbum({ name, year });
      return h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: { 'albumId': albumId },
      }).code(201);

    } catch (error) {

      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }

  async getAlbumById(request, h) {
    try {
      const { albumId } = request.params;
      const album = await this._service.getAlbumById(albumId);
      return h.response({
        status: 'success',
        message: 'Ok',
        data: { 'album': album },
      }).code(200);

    } catch (error) {

      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }

  async updateAlbum(request, h) {
    try {
      const { albumId } = request.params;
      const { name, year } = request.payload;
      await this._service.updateAlbum(albumId, { name, year });
      return h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
      }).code(200);
    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: error,
      }).code(500);
    }
  }

  async deleteById(request, h) {
    try {
      const { albumId } = request.params;
      const album = await this._service.deleteById(albumId);
      return h.response({
        status: 'success',
        message: 'Ok',
        data: { 'album': album },
      }).code(200);

    } catch (error) {

      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }

  async deleteAll(request, h) {
    try {
      await this._service.deleteAll();
      return h.response({
        status: 'success',
        message: 'Albums berhasil dihapus',
      }).code(201);

    } catch (error) {
      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }

  async getAll(request, h) {
    try {
      const albums = await this._service.getAllAlbums();
      return h.response({
        status: 'success',
        message: 'Ok',
        data: { 'album': albums },
      }).code(200);

    } catch (error) {

      if (error instanceof CustomError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Something wrong!',
      }).code(500);
    }
  }
}

module.exports = AlbumHandler;