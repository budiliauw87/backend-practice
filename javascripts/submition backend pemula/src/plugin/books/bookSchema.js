const Joi = require('joi');

const bookSchemaId = Joi.object({
  bookId: Joi.string()
    .required()
    .messages({
      'string.base': 'Id buku salah format',
      'string.empty': 'Id buku tidak bole kosong',
      'any.required': 'silakan isi Id buku',
    }),
});

const bookSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan buku. Nama buku salah format',
      'string.empty': 'Gagal menambahkan buku. Nama buku tidak bole kosong',
      'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
    }),
  year: Joi.number()
    .required()
    .integer()
    .min(1945)
    .max(2021)
    .messages({
      'number.base': 'Gagal menambahkan buku. Tahun buku salah format',
      'number.min': 'Gagal menambahkan buku. Tahun buku min 1945',
      'number.max': 'Gagal menambahkan buku. Tahun buku max 2021',
      'any.required': 'Gagal menambahkan buku. Mohon isi Tahun buku',
    }),
  author: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan buku. Author buku salah format',
      'string.empty': 'Gagal menambahkan buku. Author buku tidak bole kosong',
      'any.required': 'Gagal menambahkan buku. Mohon isi Author buku',
    }),
  summary: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan buku. Summary buku salah format',
      'string.empty': 'Gagal menambahkan buku. Summary buku tidak bole kosong',
      'any.required': 'Gagal menambahkan buku. Mohon isi Summary buku',
    }),
  publisher: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal menambahkan buku. publisher buku salah format',
      'string.empty': 'Gagal menambahkan buku. publisher buku tidak bole kosong',
      'any.required': 'Gagal menambahkan buku. Mohon isi publisher buku',
    }),
  pageCount: Joi.number()
    .required()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Gagal menambahkan buku. pageCount buku salah format',
      'number.min': 'Gagal menambahkan buku. pageCount buku min 0',
      'any.required': 'Gagal menambahkan buku. Mohon isi pageCount buku',
    }),
  readPage: Joi.number()
    .required()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Gagal menambahkan buku. readPage buku salah format',
      'number.min': 'Gagal menambahkan buku. readPage buku min 0',
      'any.required': 'Gagal menambahkan buku. Mohon isi readPage buku',
    }),
  reading:Joi.boolean()
    .required()
    .messages({
      'any.required': 'Gagal menambahkan buku. Mohon isi status bacaan buku',
    }),
});

const bookSchemaUpdate = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui buku. Nama buku salah format',
      'string.empty': 'Gagal memperbarui buku. Nama buku tidak bole kosong',
      'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
    }),
  year: Joi.number()
    .required()
    .integer()
    .min(1945)
    .max(2021)
    .messages({
      'number.base': 'Gagal memperbarui buku. Tahun buku salah format',
      'number.min': 'Gagal memperbarui buku. Tahun buku min 1945',
      'number.max': 'Gagal memperbarui buku. Tahun buku max 2021',
      'any.required': 'Gagal memperbarui buku. Mohon isi Tahun buku',
    }),
  author: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui buku. Author buku salah format',
      'string.empty': 'Gagal memperbarui buku. Author buku tidak bole kosong',
      'any.required': 'Gagal memperbarui buku. Mohon isi Author buku',
    }),
  summary: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui buku. Summary buku salah format',
      'string.empty': 'Gagal memperbarui buku. Summary buku tidak bole kosong',
      'any.required': 'Gagal memperbarui buku. Mohon isi Summary buku',
    }),
  publisher: Joi.string()
    .required()
    .messages({
      'string.base': 'Gagal memperbarui buku. publisher buku salah format',
      'string.empty': 'Gagal memperbarui buku. publisher buku tidak bole kosong',
      'any.required': 'Gagal memperbarui buku. Mohon isi publisher buku',
    }),
  pageCount: Joi.number()
    .required()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Gagal memperbarui buku. pageCount buku salah format',
      'number.min': 'Gagal memperbarui buku. pageCount buku min 0',
      'any.required': 'Gagal memperbarui buku. Mohon isi pageCount buku',
    }),
  readPage: Joi.number()
    .required()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Gagal memperbarui buku. readPage buku salah format',
      'number.min': 'Gagal memperbarui buku. readPage buku min 0',
      'any.required': 'Gagal memperbarui buku. Mohon isi readPage buku',
    }),
  reading:Joi.boolean()
    .required()
    .messages({
      'any.required': 'Gagal memperbarui buku. Mohon isi status bacaan buku',
    }),
});


module.exports = { bookSchema, bookSchemaId, bookSchemaUpdate };