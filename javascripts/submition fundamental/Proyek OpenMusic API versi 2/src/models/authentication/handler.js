const responError = require('../../utils/responError');

class AuthHandler {

  //construct class
  constructor(service, userService, tokenManager) {
    this._service = service;
    this._usersService = userService;
    this._tokenManager = tokenManager;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }
  async postAuthenticationHandler(request, h) {
    try {
      //cek username on database
      const { username, password } = request.payload;
      const id = await this._usersService.verifyUserCredential(username, password);

      //generate token
      const accessToken =  this._tokenManager.generateTokenAccess({ id });
      const refreshToken = this._tokenManager.generateTokenRefresh({ id });
      //save refreshToken on db
      await this._service.addRefreshToken(refreshToken);


      return h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken,
        },
      }).code(201);

    } catch (error) {
      return responError.handleError(error, h);
    }
  }

  //verify refreshToken to refresh accessToken
  async putAuthenticationHandler(request, h) {
    try {
      //check token store on db
      const { refreshToken } = request.payload;
      await this._service.verifyRefreshToken(refreshToken);
      //check signature refreshToken
      const { id } = this._tokenManager.verifyTokenRefresh(refreshToken);
      //generate new accessToken
      const accessToken = this._tokenManager.generateTokenAccess({ id });

      return h.response({
        status: 'success',
        message: 'Access Token berhasil diperbarui',
        data: {
          accessToken,
        },
      }).code(200);

    } catch (error) {
      return responError.handleError(error, h);
    }
  }

  //delete refreshToken on db
  async deleteAuthenticationHandler(request, h){
    try {
      //verify and deleted on db
      const { refreshToken } = request.payload;
      await this._service.verifyRefreshToken(refreshToken);
      await this._service.deleteRefreshToken(refreshToken);

      return h.response({
        status: 'success',
        message: 'Refresh token berhasil dihapus',
      }).code(200);

    } catch (error) {
      return responError.handleError(error, h);
    }
  }



}

module.exports = AuthHandler;