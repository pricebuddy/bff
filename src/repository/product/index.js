const makeRepository = require('./product-repository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }

  selectCompetitorProductsByParentIdAndCompetitorId(parentId, competitorId) {
    return this.repository.selectCompetitorProductsByParentIdAndCompetitorId(parentId, competitorId);
  }

  selectBySku(sku, sellerId) {
    return this.repository.selectBySku(sku, sellerId);
  }
}

module.exports = ProductRepository;
