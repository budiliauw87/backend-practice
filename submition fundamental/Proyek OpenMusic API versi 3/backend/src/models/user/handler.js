class UserHandler {

  //construct class
  constructor(service) {
    this._service = service;
  }

  //registrasi user
  async addUserHandler(request, h) {
    const { username, password, fullname } = request.payload;
    const userId = await this._service.addUser({  username, password, fullname  });
    return h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { 'userId': userId },
    }).code(201);
  }

}

module.exports = UserHandler;