const makeRepository = require('./product-repository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }

  selectCompetitorProductsByParentId(parentId, competitorIds) {
    return this.repository.selectCompetitorProductsByParentId(parentId, competitorIds);
  }

  updateSellerProduct(product) {
    return this.repository.updateSellerProduct(product);
  }
}

module.exports = ProductRepository;
