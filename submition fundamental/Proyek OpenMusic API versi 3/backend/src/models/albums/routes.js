/**
 * ---------------------------------------------------------
 * Routes Open Music Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */
const { albumSchema, albumSchemaId } = require('./albumSchema');
const responError = require('../../utils/responError');
const path = require('path');
const routes = (handler) => [

  //insert album
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.addAlbum(request, h),
    options: {
      validate: {
        payload: albumSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
  //get album by id
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: (request, h) => handler.getAlbumById(request, h),
    options: {
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  //updated album
  {
    method: 'PUT',
    path: '/albums/{albumId}',
    handler: (request, h)=> handler.updateAlbum(request, h),
    options: {
      validate: {
        params: albumSchemaId,
        payload: albumSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  //delete album by id
  {
    method: 'DELETE',
    path: '/albums/{albumId}',
    handler: (request, h)=>handler.deleteById(request, h),
    options: {
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },

  //delete all song
  {
    method: 'DELETE',
    path: '/albums/all',
    handler: (request, h)=>handler.deleteAll(request, h),
  },
  //get All
  {
    method: 'GET',
    path: '/albums',
    handler: (request, h)=>handler.getAll(request, h),
  },

  {
    method: 'GET',
    path: '/albums/cover/{param*}',
    handler: {
      directory: {
        path: path.resolve(path.dirname(require.main.filename), 'upload/file/images'),
      },
    },
  },

  {
    method: 'POST',
    path: '/albums/{albumId}/covers',
    handler: (request, h) => handler.uploadCover(request, h),
    options: {
      payload: {
        output: 'stream',
        allow: 'multipart/form-data',
        multipart : true,
        maxBytes: 512000, // 512KB
      },
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: (request, h) => handler.likeAlbum(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}/likes',
    handler: (request, h) => handler.deleteLikeAlbum(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: (request, h) => handler.getAlbumLikes(request, h),
    options: {
      validate: {
        params: albumSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
];

module.exports = routes;