const MasterProductRepository = require('./master-product');
const ProductRepository = require('./product');
const SellerRepository = require('./seller');

function DomainRepositories(fastify) {
  return {
    productRepository: new ProductRepository(fastify),
    sellerRepository: new SellerRepository(fastify),
    masterProductRepository: new MasterProductRepository(fastify),
  };
}

module.exports = DomainRepositories;
