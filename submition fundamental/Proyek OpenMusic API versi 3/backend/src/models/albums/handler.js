const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');
class AlbumHandler {

  //construct class
  constructor(service, storageService, likeService, cacheService) {
    this._service = service;
    this._storageService = storageService;
    this._likeService = likeService;
    this._cacheService = cacheService;
  }

  async addAlbum(request, h) {
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });
    return h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: { 'albumId': albumId },
    }).code(201);
  }

  async getAlbumById(request, h) {
    const { albumId } = request.params;
    const album = await this._service.getAlbumById(albumId);
    return h.response({
      status: 'success',
      message: 'Ok',
      data: { 'album': album },
    }).code(200);
  }

  async updateAlbum(request, h) {
    const { albumId } = request.params;
    const { name, year } = request.payload;
    await this._service.updateAlbum(albumId, { name, year });
    return h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    }).code(200);
  }

  async deleteById(request, h) {
    const { albumId } = request.params;
    const album = await this._service.deleteById(albumId);
    await this._cacheService.delete(`likes:${albumId}`);
    return h.response({
      status: 'success',
      message: 'Ok',
      data: { 'album': album },
    }).code(200);
  }

  async deleteAll(request, h) {
    await this._service.deleteAll();
    return h.response({
      status: 'success',
      message: 'Albums berhasil dihapus',
    }).code(201);
  }

  async getAll(request, h) {
    const albums = await this._service.getAllAlbums();
    return h.response({
      status: 'success',
      message: 'Ok',
      data: { 'album': albums },
    }).code(200);
  }


  async uploadCover(request, h){
    const { albumId } = request.params;
    const { cover } = request.payload;
    await this.validateFileImage(cover.hapi.headers);
    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/albums/cover/${filename}`;
    await this._service.updateAlbumCover(albumId, coverUrl);
    return h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: { cover: coverUrl, },
    }).code(201);
  }

  async likeAlbum(request, h){
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.getAlbumById(albumId);
    await this._likeService.addLikeAlbums(credentialId, albumId);
    return h.response({
      status: 'success',
      message: 'Berhasil Menyukai album',
    }).code(201);
  }

  async getAlbumLikes(request, h){
    const { albumId } = request.params;
    await this._service.getAlbumById(albumId);
    const totalLikeCache =  await this._cacheService.get(`likes:${albumId}`);
    console.log(`cache ${totalLikeCache}`);
    if (totalLikeCache === null){
      const totalLike = await this._likeService.getTotalLikes(albumId);
      //save to db
      await this._cacheService.set(`likes:${albumId}`, JSON.stringify(totalLike), 1800);
      return h.response({
        status: 'success',
        message: 'Ok',
        data : { likes: parseInt(totalLike.likes) }
      }).code(200);
    } else {
      return h.response({
        status: 'success',
        message: 'Ok',
        data : { likes: parseInt(totalLikeCache.likes) }
      }).header('X-Data-Source', 'cache').code(200);
    }
  }
  async deleteLikeAlbum(request, h){
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._likeService.deleteLikeAlbum(credentialId, albumId);
    await this._cacheService.delete(`likes:${albumId}`);
    return h.response({
      status: 'success',
      message: 'Berhasil menghapus menyukai',
    }).code(200);
  }

  //validate mimetype image file
  async validateFileImage(headers){
    const FileImageSchema = Joi.object({
      'content-type': Joi.string().valid(
        'image/apng',
        'image/avif',
        'image/gif',
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp').required(),
    }).unknown();
    const validationResult = FileImageSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = AlbumHandler;