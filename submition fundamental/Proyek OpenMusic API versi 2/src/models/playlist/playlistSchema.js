const Joi = require('joi');

const playlistSchema = Joi.object({
  name: Joi.string().required(),
});

const playlistIdSchema = Joi.object({
  playlistId: Joi.string().required(),
});

const playlistSongSchema = Joi.object({
  songId: Joi.string().required(),
});
module.exports = { playlistSchema, playlistIdSchema, playlistSongSchema };