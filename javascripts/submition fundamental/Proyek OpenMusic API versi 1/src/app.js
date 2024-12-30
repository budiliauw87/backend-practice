/**
 * Tugas Backend Fundamental Submission pertama
 * Membuat API openmusic
 * ----------------------------------------
 * Created by Budiliauw87
 * Framework @hapi https://hapi.dev
 * Database PSQL / PostGres
 */

require('dotenv').config();
const Hapi = require('@hapi/hapi');

//plugins
const song = require('./models/song');
const albums = require('./models/albums');

//services
const SongService = require('./services/postgres/SongService');
const AlbumService = require('./services/postgres/AlbumService');

// mulai menjalakan server
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  //register modul
  const albumService = new AlbumService();
  const songService = new SongService();
  await server.register([
    {
      plugin: albums,
      options: { service: albumService },
    },
    {
      plugin: song,
      options: { service: songService },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();