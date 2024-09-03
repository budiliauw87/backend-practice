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
const responError = require('../../utils/responError');

const routes = (handler) => [

  {
    method: 'POST',
    path: '/collaborations',
    handler: (request, h) => handler.postCollabHandler(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: postCollab,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: (request, h) => handler.deleteCollabHandler(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: postCollab,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
];

module.exports = routes;