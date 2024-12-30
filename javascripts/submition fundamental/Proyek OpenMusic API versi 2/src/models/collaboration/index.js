const CollabHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new CollabHandler(service);
    server.route(routes(handler));
  },
};
