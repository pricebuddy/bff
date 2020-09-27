const { getProduct, getProducts } = require('../service/product-service');

const productApi = async (fastify) => {
  fastify.get(
    '/tenant/:id/products',
    async (req, reply) => getProducts(fastify, req, reply),
  );
};

module.exports = productApi;
