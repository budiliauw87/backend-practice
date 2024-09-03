const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, { service, playlistSong, songService, actService }) => {
    const handler = new PlaylistHandler(service, playlistSong, songService, actService);
    server.route(routes(handler));
  },
};
