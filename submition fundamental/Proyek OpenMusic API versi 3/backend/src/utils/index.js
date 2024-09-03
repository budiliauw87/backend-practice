const mapDBToModel = ({
  // eslint-disable-next-line camelcase
  id, title, year, performer, genre, duration, album, inserted_at, updated_at,
}) => ({
  // eslint-disable-next-line camelcase
  id, title, year, performer, genre, duration, albumId: album, insertedAt: inserted_at, updatedAt: updated_at
});

module.exports = { mapDBToModel };