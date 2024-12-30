/**
 * ---------------------------------------------------------
 * Routes Open Music Playlist
 * Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */

const {
  playlistSchema,
  playlistIdSchema,
  playlistSongSchema
} = require('./playlistSchema');
const routes = (handler) => [

  //get list playlist
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistHandler,
    options: {
      auth: 'openmusic_auth',
    },

  },

  //add new playlist
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.addPlaylistHandler,
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: playlistSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },

  //delete  playlist
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistHandler,
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },

  //get songs on playlist
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongPlaylist,
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },

  //add songs on playlist
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.addSongPlaylist,
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        payload: playlistSongSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },
  //add songs on playlist
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSongPlaylist,
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        payload: playlistSongSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },
  //Activities playlist
  {
    method: 'GET',
    path: '/playlists/{playlistId}/activities',
    handler: handler.activitySongPlaylist,
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => {
          if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
            const invalidItem = err.details[0];
            return h.response({ status: 'fail', 'message': invalidItem.message })
              .code(400)
              .takeover();
          }

          return h.response(err)
            .takeover();
        },
      },
    },
  },
];

module.exports = routes;