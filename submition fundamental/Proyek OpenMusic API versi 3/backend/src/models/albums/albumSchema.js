const Joi = require('joi');
const albumSchemaId = Joi.object({
  albumId: Joi.string()
    .required()
    .messages({
      'string.base': 'Id album salah format',
      'string.empty': 'Id album tidak bole kosong',
      'any.required': 'silakan isi Id album',
    }),
});
const albumSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan album. judul album salah format',
      'string.empty': 'Gagal menambahkan album. judul album tidak bole kosong',
      'any.required': 'Gagal menambahkan album. Mohon isi judul album',
    }),
  year: Joi.number()
    .required()
    .integer()
    .min(1945)
    .max(2024)
    .messages({
      'number.base': 'Gagal menambahkan album. Tahun album salah format',
      'number.min': 'Gagal menambahkan album. Tahun album min 1945',
      'number.max': 'Gagal menambahkan album. Tahun album max 2021',
      'any.required': 'Gagal menambahkan album. Mohon isi Tahun album',
    }),
});


const coverSchema = Joi.object({
  cover: Joi.any().required()
});
module.exports = { albumSchema, albumSchemaId, coverSchema };