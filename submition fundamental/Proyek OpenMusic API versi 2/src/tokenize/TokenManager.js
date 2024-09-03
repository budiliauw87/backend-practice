/* eslint-disable no-unused-vars */
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateTokenAccess : (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateTokenRefresh : (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyTokenRefresh : (refreshToken) => {
    try {
      const decodeToken = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(decodeToken, process.env.REFRESH_TOKEN_KEY);
      const { payload } = decodeToken.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },

};

module.exports = TokenManager;