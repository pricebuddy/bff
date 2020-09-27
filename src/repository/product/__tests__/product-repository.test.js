const faker = require('faker');
const Fastify = require('fastify');
const ProductRepository = require('..');

describe('Product repository', () => {
  let fastify;
  let masterProductRepository;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.mongo = {
      db: {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn(),
      },
    };
    masterProductRepository = new ProductRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  it('should call find by sellerId', async () => {
    const sellerId = faker.random.uuid();

    await masterProductRepository.sellectProductsBySeller(sellerId);

    expect(fastify.mongo.db.find).toHaveBeenCalledWith({ sellerId });
    expect(fastify.mongo.db.collection).toHaveBeenCalledWith('products');
  });

  it('should call findOne by id', async () => {
    const sellerId = faker.random.uuid();
    const sku = faker.random.uuid();

    await masterProductRepository.selectBySku(sku, sellerId);

    expect(fastify.mongo.db.findOne).toHaveBeenCalledWith({ sellerId, sku });
    expect(fastify.mongo.db.collection).toHaveBeenCalledWith('products');
  });

  it('should call findOne by id', async () => {
    const parentId = faker.random.uuid();
    const sellerId = faker.random.uuid();

    await masterProductRepository
      .selectCompetitorProductsByParentIdAndCompetitorId(parentId, sellerId);

    expect(fastify.mongo.db.findOne).toHaveBeenCalledWith({ parentId, sellerId });
    expect(fastify.mongo.db.collection).toHaveBeenCalledWith('products');
  });
});
