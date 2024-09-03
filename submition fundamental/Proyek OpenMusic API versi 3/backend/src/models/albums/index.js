const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server,
    { service,
      storageService,
      likeService,
      cacheService
    }) => {
    const handler = new AlbumHandler(service, storageService, likeService, cacheService);
    server.route(routes(handler));
  },
};
