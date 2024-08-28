exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'playlists',
    },
    user: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'users',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
