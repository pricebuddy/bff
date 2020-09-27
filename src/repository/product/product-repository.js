const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const selectCompetitorProductsByParentIdAndCompetitorId = async (parentId, competitorId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { parentId, sellerId: competitorId };

    const res = await collection.findOne(query);

    return res;
  };

  return { selectCompetitorProductsByParentIdAndCompetitorId, sellectProductsBySeller };
};

module.exports = makeRepository;
