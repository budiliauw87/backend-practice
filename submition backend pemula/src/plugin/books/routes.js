/**
 * ---------------------------------------------------------
 * Routes Bookshelf Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 *
 */
const { bookSchema, bookSchemaId, bookSchemaUpdate } = require('./bookSchema');
const routes = (handler)=> [

  /* Menambahkan buku */
  {
    method: 'POST',
    path: '/books',
    handler: handler.tambahBookHandler,
    options: {
      validate: {
        payload: bookSchema,
        failAction: (request, h, err)=>{
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status:'fail', 'message':invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      }
    },

  },

  /* Ambil semua data buku */
  {
    method: 'GET',
    path: '/books',
    handler: handler.ambilBukuHandler,
  },

  /* Mengambil detail buku */
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.ambilBukuDetailHandler,
    options: {
      validate:{
        params: bookSchemaId,
        failAction: (request, h, err)=>{
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status:'fail', 'message':invalidItem.message })
              .code(400)
              .takeover();
          }
          return h.response(err)
            .takeover();
        },
      }
    },
  },

  /* Update data buku */
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.updateBukuHandler,
    options: {
      validate:{
        params: bookSchemaId,
        payload: bookSchemaUpdate,
        failAction: (request, h, err)=>{
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status:'fail', 'message':invalidItem.message })
              .code(400)
              .takeover();
          }
          return h.response(err)
            .takeover();
        },
      }
    },
  },

  /* Hapus data buku */
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBukuHandler,
    options: {
      validate:{
        params: bookSchemaId,
        failAction: (request, h, err)=>{
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status:'fail', 'message':invalidItem.message })
              .code(400)
              .takeover();
          }
          return h.response(err)
            .takeover();
        },
      }
    },
  }
];

module.exports = routes;