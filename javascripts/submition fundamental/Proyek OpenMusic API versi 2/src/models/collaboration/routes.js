/**
 * ---------------------------------------------------------
 * Routes Open Music Authentication
 * Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */
const { postCollab } = require('./collabSchema');
const routes = (handler) => [

  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollabHandler,
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: postCollab,
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
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollabHandler,
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: postCollab,
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
];

module.exports = routes;