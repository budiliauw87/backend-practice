const Joi = require('joi');
const songSchemaId = Joi.object({
  songId: Joi.string()
    .required()
    .messages({
      'string.base': 'Id lagu salah format',
      'string.empty': 'Id lagu tidak bole kosong',
      'any.required': 'silakan isi Id lagu',
    }),
});
const songSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan lagu. judul lagu salah format',
      'string.empty': 'Gagal menambahkan lagu. judul lagu tidak bole kosong',
      'any.required': 'Gagal menambahkan lagu. Mohon isi judul lagu',
    }),
  year: Joi.number()
    .required()
    .integer()
    .min(1945)
    .max(2021)
    .messages({
      'number.base': 'Gagal menambahkan lagu. Tahun lagu salah format',
      'number.min': 'Gagal menambahkan lagu. Tahun lagu min 1945',
      'number.max': 'Gagal menambahkan lagu. Tahun lagu max 2021',
      'any.required': 'Gagal menambahkan lagu. Mohon isi Tahun lagu',
    }),
  performer: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan lagu. performer salah format',
      'string.empty': 'Gagal menambahkan lagu. performer tidak bole kosong',
      'any.required': 'Gagal menambahkan lagu. Mohon isi performer lagu',
    }),
  genre: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan lagu. genre lagu salah format',
      'string.empty': 'Gagal menambahkan lagu. genre lagu tidak bole kosong',
      'any.required': 'Gagal menambahkan lagu. Mohon isi genre lagu',
    }),
  duration: Joi.number()
    .required()
    .integer()
    .min(60)
    .messages({
      'number.base': 'Gagal memperbarui lagu. Durasi lagu salah format',
      'number.min': 'Gagal memperbarui lagu. Durasi lagu min 60',
      'any.required': 'Gagal memperbarui lagu. Mohon isi Durasi lagu',
    }),
  albumId: Joi.string(),
});

const songSchemaUpdate = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui lagu. judul lagu salah format',
      'string.empty': 'Gagal memperbarui lagu. judul lagu tidak bole kosong',
      'any.required': 'Gagal memperbarui lagu. Mohon isi judul lagu',
    }),
  year: Joi.number()
    .required()
    .integer()
    .min(1945)
    .max(2021)
    .messages({
      'number.base': 'Gagal memperbarui lagu. Tahun lagu salah format',
      'number.min': 'Gagal memperbarui lagu. Tahun lagu min 1945',
      'number.max': 'Gagal memperbarui lagu. Tahun lagu max 2021',
      'any.required': 'Gagal memperbarui lagu. Mohon isi Tahun lagu',
    }),
  performer: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui lagu. Performer lagu salah format',
      'string.empty': 'Gagal memperbarui lagu. Performer lagu tidak bole kosong',
      'any.required': 'Gagal memperbarui lagu. Mohon isi Performer lagu',
    }),
  genre: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui lagu. Genre lagu salah format',
      'string.empty': 'Gagal memperbarui lagu. Genre lagu tidak bole kosong',
      'any.required': 'Gagal memperbarui lagu. Mohon isi Genre lagu',
    }),
  duration: Joi.number()
    .required()
    .integer()
    .min(60)
    .messages({
      'number.base': 'Gagal memperbarui lagu. Durasi lagu salah format',
      'number.min': 'Gagal memperbarui lagu. Durasi lagu min 60',
      'any.required': 'Gagal memperbarui lagu. Mohon isi Durasi lagu',
    }),
});


module.exports = { songSchema, songSchemaUpdate, songSchemaId };