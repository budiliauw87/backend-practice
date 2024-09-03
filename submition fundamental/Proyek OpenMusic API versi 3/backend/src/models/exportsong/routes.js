/**
 * ---------------------------------------------------------
 * Routes Open Music Export
 * Created by Budiliauw87
 * ---------------------------------------------------------
 * Schema validation payload
 * Ref doc validation
 * @hapi = https://hapi.dev/tutorials/validation/?lang=en_US
 * @Joi  = https://joi.dev/api/?v=17.4.0
 */
const { postExport } = require('./exportSchema');
const responError = require('../../utils/responError');

const routes = (handler) => [

  //export data playlist
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: (request, h)=> handler.postExportPlaylistHandler(request, h),
    options: {
      auth: 'openmusic_auth',
      validate: {
        payload: postExport,
        failAction: (request, h, err) => responError.handleValidator(h, err),
      }
    },
  },
];

module.exports = routes;