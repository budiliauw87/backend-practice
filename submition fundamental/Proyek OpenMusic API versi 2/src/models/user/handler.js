const responError = require('../../utils/responError');

class UserHandler {

  //construct class
  constructor(service) {
    this._service = service;
    this.addUserHandler = this.addUserHandler.bind(this);
  }

  //registrasi user
  async addUserHandler(request, h) {
    try {
      const { username, password, fullname } = request.payload;
      const userId = await this._service.addUser({  username, password, fullname  });
      return h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: { 'userId': userId },
      }).code(201);
    } catch (error) {
      return responError.handleError(error, h);
    }

  }

}

module.exports = UserHandler;