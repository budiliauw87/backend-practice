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
const routes = (handler) => [

  //insert new song
  {
    method: 'POST',
    path: '/songs',
    handler: handler.addSongHandler,
    options: {
      validate: {
        payload: songSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      }
    },

  },
  //get All song
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongHandler,
  },
  //get detail song
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getDetailSongHandler,
    options: {
      validate: {
        params: songSchemaId,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      }
    },
  },
  //updated song
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.updateSongHandler,
    options: {
      validate: {
        params: songSchemaId,
        payload: songSchemaUpdate,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      }
    },
  },
  //delete song with id
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteSongHandler,
    options: {
      validate: {
        params: songSchemaId,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      }
    },
  },
  //delete all song
  {
    method: 'DELETE',
    path: '/songs/all',
    handler: handler.deleteAllSongHandler,
  },

  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response({ status: 'fail', 'message': 'Lagi Bug bounty ya :), belum buat program bro !!' }).code(404);
    }
  },
];

module.exports = routes;