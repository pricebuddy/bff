const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const selectBySku = async (sku, sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sku, sellerId };

    const res = await collection.findOne(query);

    return res;
  };

  const selectCompetitorProductsByParentIdAndCompetitorId = async (parentId, competitorId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { parentId, sellerId: competitorId };

    const res = await collection.findOne(query);

    return res;
  };

  return {
    selectCompetitorProductsByParentIdAndCompetitorId,
    sellectProductsBySeller,
    selectBySku,
  };
};

module.exports = makeRepository;
