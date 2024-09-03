const ClientError = require('../exceptions/ClientError');
const responError = {
  handleError :(error, h)=>{
    if (error instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(error.statusCode);
    }
    return h.response({
      status: 'error',
      message: error.message,
    }).code(500);
  }
};
module.exports = responError;