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
      },
    };
    masterProductRepository = new ProductRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  it('should call findOne by parentId', async () => {
    const id = faker.random.uuid();

    await masterProductRepository.selectById(id);

    expect(fastify.mongo.db.findOne).toHaveBeenCalledWith({ id });
    expect(fastify.mongo.db.collection).toHaveBeenCalledWith('masterProducts');
  });
});
