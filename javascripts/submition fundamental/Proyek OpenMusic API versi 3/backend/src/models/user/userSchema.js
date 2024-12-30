const Joi = require('joi');

const userSchema = Joi.object({
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
  fullname: Joi.string()
    .required()
    .messages({
      'string.base': 'fullname salah format',
      'string.empty': 'fullname tidak bole kosong',
      'any.required': 'silakan isi fullname',
    }),
});;


module.exports = { userSchema };