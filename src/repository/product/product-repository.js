const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const selectByParentId = async (parentId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { parentId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const updateSellerProduct = async (product) => {
    const { db } = fastify.mongo;

    const collection = db.collection('productsasdasdasd');

    const res = await collection.save(product);

    return res;
  };

  return { selectByParentId, sellectProductsBySeller, updateSellerProduct };
};

module.exports = makeRepository;
