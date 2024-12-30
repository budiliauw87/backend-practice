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
const Inert = require('@hapi/inert');
const path = require('path');

const config = require('./utils/config');

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
const StorageService = require('./services/storage/StorageService');
const LikeService = require('./services/postgres/LikeService');
const CacheService = require('./services/redis/CacheServices');


//exceptions
const ClientError = require('./exceptions/ClientError');


// mulai menjalakan server
const init = async () => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
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
  server.register([
    { plugin:Jwt },
    { plugin:Inert }
  ]);
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
  const playlistService = new PlaylistService();

  const pathFolderImage = path.resolve(__dirname, 'upload/file/images');
  const storageService = new StorageService(pathFolderImage);

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
      options: {
        service: new AlbumService(),
        storageService :storageService,
        likeService : new LikeService(),
        cacheService : new CacheService(),
      },
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
        service: playlistService,
        playlistSong:new PlaylistSongService(),
        songService:songService,
        actService : new ActService(),
      },
    },
    {
      plugin: collaboration,
      options: {
        service: new CollabService(),
      },
    },
    {
      plugin: exportsong,
      options: {
        service: ProducerService,
        playlistService: playlistService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {

      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami !! ',
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });


  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();