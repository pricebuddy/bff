const makeRepository = (fastify) => {
  const selectAll = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find();

    return res;
  };

  const selectMySellers = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find({ ally: true });

    return res;
  };

  const selectAllCompetitors = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find({ ally: false });

    return res.toArray();
  };

  return {
    selectAll, selectAllCompetitors, selectMySellers,
  };
};

module.exports = makeRepository;
