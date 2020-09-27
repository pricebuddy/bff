const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const selectCompetitorProductsByParentId = async (parentId, competitorIds) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { parentId, sellerId: { $in: competitorIds } };

    const res = await collection.find(query);

    return res.toArray();
  };

  return { selectCompetitorProductsByParentId, sellectProductsBySeller };
};

module.exports = makeRepository;
