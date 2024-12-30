/**
 * ---------------------------------------------------------
 * Routes Open Music Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */
const { songSchema, songSchemaUpdate, songSchemaId } = require('./songSchema');
const responError = require('../../utils/responError');
const routes = (handler) => [

  //insert new song
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.addSongHandler(request, h),
    options: {
      validate: {
        payload: songSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },

  },
  //get All song
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getSongHandler(request, h),
  },
  //get detail song
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: (request, h) => handler.getDetailSongHandler(request, h),
    options: {
      validate: {
        params: songSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
  //updated song
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: (request, h) => handler.updateSongHandler(request, h),
    options: {
      validate: {
        params: songSchemaId,
        payload: songSchemaUpdate,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
  //delete song with id
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: (request, h) => handler.deleteSongHandler(request, h),
    options: {
      validate: {
        params: songSchemaId,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
  //delete all song
  {
    method: 'DELETE',
    path: '/songs/all',
    handler: (request, h) => handler.deleteAllSongHandler(request, h),
  },

  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response({
        status: 'fail',
        message: 'Lagi Bug bounty ya :), belum buat program bro !!'
      }).code(404);
    }
  },
];

module.exports = routes;