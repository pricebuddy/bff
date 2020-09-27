const makeRepository = (fastify) => {
  const selectById = async (id) => {
    const { db } = fastify.mongo;

    const collection = db.collection('masterProducts');

    const res = await collection.findOne({ id });

    return res;
  };

  return {
    selectById,
  };
};

module.exports = makeRepository;
