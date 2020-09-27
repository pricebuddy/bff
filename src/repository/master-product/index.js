const makeRepository = require('./master-product-repository');

class MasterProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectById(sellerId) {
    return this.repository.selectById(sellerId);
  }
}

module.exports = MasterProductRepository;
