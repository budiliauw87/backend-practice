/**
 * ---------------------------------------------------------
 * Routes Open Music User
 * Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */

const { userSchema } = require('./userSchema');
const responError = require('../../utils/responError');
const routes = (handler) => [

  //Registration user
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.addUserHandler(request, h),
    options: {
      validate: {
        payload: userSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
];

module.exports = routes;