
exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    userid: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'users',
    },
    albumid: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'albums',
    },
  });
};
exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
