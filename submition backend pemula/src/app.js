/**
 * Tugas submission
 * Task dicoding Backend pemula
 * ----------------------------------------
 * Created by Budiliauw87
 * Framework @hapi https://hapi.dev
 */

//memanggil Framework hapi
const Hapi = require('@hapi/hapi');

//memanggil plugin modul buku
const books = require('./plugin/books');
const BooksModule =  require('./plugin/BooksModule');

// mulai menjalakan server
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors:{
        origin:['*'],
      },
    },
  });

  /**
      * menambahkan plugin
      * Refrensi doc https://hapi.dev/tutorials/plugins/?lang=en_US
      */
  const pluginBooks = new BooksModule();
  await server.register({
    plugin: books,
    options: { service: pluginBooks },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();