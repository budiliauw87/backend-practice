const Joi = require('joi');

const postExport = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});
module.exports = { postExport };