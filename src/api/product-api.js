const { getProduct, getProducts } = require('../service/product-service');

const productApi = async (fastify) => {
  fastify.get(
    '/products',
    async (req, reply) => getProducts(fastify, req, reply),
  );

  fastify.get(
    '/products/:id',
    async (req, reply) => getProduct(fastify, req, reply),
  );
};

module.exports = productApi;
