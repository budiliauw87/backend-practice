const Joi = require('joi');
const postCollab = Joi.object({
  playlistId: Joi.string()
    .required()
    .messages({
      'string.base': 'playlist invalid format !',
      'string.empty': 'playlist tidak bole kosong',
      'any.required': 'invalid request',
    }),
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'userId invalid format !',
      'string.empty': 'userId tidak bole kosong',
      'any.required': 'invalid request',
    }),
});


module.exports = { postCollab };