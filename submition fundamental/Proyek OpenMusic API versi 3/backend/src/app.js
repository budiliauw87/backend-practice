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
const Jwt = require('@hapi/jwt');

//plugins
const song = require('./models/song');
const albums = require('./models/albums');
const user = require('./models/user');
const auth = require('./models/authentication');
const playlist = require('./models/playlist');
const collaboration = require('./models/collaboration');
const exportsong = require('./models/exportsong');

//services
const SongService = require('./services/postgres/SongService');
const AlbumService = require('./services/postgres/AlbumService');
const UserService = require('./services/postgres/UserService');
const AuthService = require('./services/postgres/AuthService');
const TokenManager  = require('./tokenize/TokenManager');
const PlaylistService = require('./services/postgres/PlaylistService');
const PlaylistSongService = require('./services/postgres/PlaylistSongService');
const ActService = require('./services/postgres/ActService');
const CollabService = require('./services/postgres/CollabService');
const ProducerService = require('./services/rabbitmq/ProducerService');

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

  /**
   * authentication strategy jwt
   * For more doc https://hapi.dev/module/jwt
   */
  server.register({ plugin:Jwt });
  server.auth.strategy('openmusic_auth', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  const userService = new UserService();
  const songService = new SongService();
  const playService = new PlaylistService();

  //register modul
  await server.register([
    {
      plugin: auth,
      options: {
        service: new AuthService(),
        userService:userService,
        tokenManager:TokenManager
      },
    },
    {
      plugin: albums,
      options: { service: new AlbumService() },
    },
    {
      plugin: song,
      options: { service: songService },
    },
    {
      plugin: user,
      options: { service: userService },
    },
    {
      plugin: playlist,
      options: {
        service: playService,
        playlistSong:new PlaylistSongService(),
        songService:songService,
        actService : new ActService(),
      },
    },
    {
      plugin: collaboration,
      options: {
        service: new CollabService(),
      }
    },
    {
      plugin: exportsong,
      options: {
        service: ProducerService,
        playService: playService,
      }
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();