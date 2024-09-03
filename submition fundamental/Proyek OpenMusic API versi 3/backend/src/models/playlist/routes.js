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

const responError = require('../../utils/responError');

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
    handler: (request, h) => handler.getPlaylistHandler(request, h),
    options: {
      auth: 'openmusic_auth',
    },

  },

  //add new playlist
  {
    method: 'POST',
    path: '/playlists',
    handler: (request, h) => handler.addPlaylistHandler(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: playlistSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },

  //delete  playlist
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: (request, h) => handler.deletePlaylistHandler(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },

  //get songs on playlist
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.getSongPlaylist(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },

  //add songs on playlist
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.addSongPlaylist(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        payload: playlistSongSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },
  //add songs on playlist
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.deleteSongPlaylist(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        payload: playlistSongSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },
  //Activities playlist
  {
    method: 'GET',
    path: '/playlists/{playlistId}/activities',
    handler: (request, h) => handler.activitySongPlaylist(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        params: playlistIdSchema,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      },
    },
  },
];

module.exports = routes;