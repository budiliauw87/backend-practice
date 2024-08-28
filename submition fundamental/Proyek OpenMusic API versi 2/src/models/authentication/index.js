const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register: async (server, { service, userService, tokenManager }) => {
    const authHandler = new AuthHandler(service, userService, tokenManager);
    server.route(routes(authHandler));
  },
};
