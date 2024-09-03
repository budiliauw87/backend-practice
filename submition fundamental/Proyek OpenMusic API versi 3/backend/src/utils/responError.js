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
  },
  handleValidator : (h, error) =>{
    if (error.isJoi && Array.isArray(error.details) && error.details.length > 0) {
      const invalidItem = error.details[0];
      return h.response({ status: 'fail', 'message': invalidItem.message })
        .code(400)
        .takeover();
    }
    return h.response(error).takeover();
  }
};
module.exports = responError;