const BooksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.0',
  register: async (server, { service }) => {
    const bookHandler = new BooksHandler(service);
    server.route(routes(bookHandler));
  },
};
