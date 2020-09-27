const Fastify = require('fastify');
const SellerRepository = require('..');

describe('Seller repository', () => {
  let fastify;
  let sellerRepository;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.mongo = {
      db: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn(),
      },
    };
    sellerRepository = new SellerRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  it('should call find by competitors', async () => {
    await sellerRepository.selectAllCompetitors();

    expect(fastify.mongo.db.find).toHaveBeenCalledWith({ ally: false });
    expect(fastify.mongo.db.collection).toHaveBeenCalledWith('sellers');
  });
});
