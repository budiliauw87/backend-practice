const Joi = require('joi');

const PutAuth = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'string.base': 'refreshToken salah format',
      'string.empty': 'refreshToken tidak bole kosong',
      'any.required': 'invalid request',
    }),
});

const PostAuth = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.base': 'username salah format',
      'string.empty': 'username tidak bole kosong',
      'any.required': 'silakan isi username',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.base': 'password salah format',
      'string.empty': 'password tidak bole kosong',
      'any.required': 'silakan isi password',
    }),
});
const DeleteAuth = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'string.base': 'refreshToken salah format',
      'string.empty': 'refreshToken tidak bole kosong',
      'any.required': 'invalid request',
    }),
});
module.exports = { PutAuth, PostAuth, DeleteAuth };