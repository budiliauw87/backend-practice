exports.up = (pgm) => {
  pgm.createTable('activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist: {
      type: 'VARCHAR(50)',
      references :'playlists',
      notNull: true,
    },
    user: {
      type: 'VARCHAR(50)',
      references :'users',
      notNull: true,
    },
    song: {
      type: 'VARCHAR(50)',
      references :'songs',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    time:{
      type: 'timestamp',
      default: pgm.func("(now() at time zone 'utc')")
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('activities');
};
