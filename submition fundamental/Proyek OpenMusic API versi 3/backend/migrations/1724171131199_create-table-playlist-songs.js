exports.up = (pgm) => {
  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'playlists',
    },
    song: {
      type: 'VARCHAR(50)',
      notNull: true,
      references :'songs',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlistsongs');
};
