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
const responError = require('../../utils/responError');
const routes = (handler) => [

  {
    method: 'POST',
    path: '/authentications',
    handler: (request, h) =>  handler.postAuthenticationHandler(request, h),
    options: {
      validate: {
        payload: PostAuth,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (request, h) =>  handler.putAuthenticationHandler(request, h),
    options: {
      validate: {
        payload: PutAuth,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (request, h) =>  handler.deleteAuthenticationHandler(request, h),
    options: {
      validate: {
        payload: DeleteAuth,
        failAction: (request, h, err) => responError.handleValidator(h, err)
      }
    },
  },
];

module.exports = routes;