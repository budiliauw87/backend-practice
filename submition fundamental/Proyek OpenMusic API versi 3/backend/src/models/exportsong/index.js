const ExportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exportsong',
  version: '1.0.0',
  register: async (server, { service, playlistService }) => {
    const exportHandler = new ExportHandler(service, playlistService);
    server.route(routes(exportHandler));
  },
};
