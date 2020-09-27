const makeRepository = (fastify) => {
  const selectAllCompetitors = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find({ ally: false });

    return res.toArray();
  };

  return {
    selectAllCompetitors,
  };
};

module.exports = makeRepository;
