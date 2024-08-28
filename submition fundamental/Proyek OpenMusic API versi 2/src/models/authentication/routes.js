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
const { PutAuth, PostAuth, DeleteAuth } = require('./authSchema');
const routes = (handler) => [

  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      validate: {
        payload: PostAuth,
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
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      validate: {
        payload: PutAuth,
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
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      validate: {
        payload: DeleteAuth,
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