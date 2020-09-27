const makeRepository = require('./product-repository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }

  selectByParentId(parentId) {
    return this.repository.selectByParentId(parentId);
  }

  updateSellerProduct(product) {
    return this.repository.updateSellerProduct(product);
  }
}

module.exports = ProductRepository;
