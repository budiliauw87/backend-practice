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
const routes = (handler) => [

  //insert album
  {
    method: 'POST',
    path: '/albums',
    handler: handler.addAlbum,
    options: {
      validate: {
        payload: albumSchema,
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
  //get album by id
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: handler.getAlbumById,
    options: {
      validate: {
        params: albumSchemaId,
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
  //updated album
  {
    method: 'PUT',
    path: '/albums/{albumId}',
    handler: handler.updateAlbum,
    options: {
      validate: {
        params: albumSchemaId,
        payload: albumSchema,
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
  //delete album by id
  {
    method: 'DELETE',
    path: '/albums/{albumId}',
    handler: handler.deleteById,
    options: {
      validate: {
        params: albumSchemaId,
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
    path: '/albums/all',
    handler: handler.deleteAll,
  },
  //get All
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAll,
  },
];

module.exports = routes;