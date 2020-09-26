const log = require('pino')({ level: 'info' });
const fastify = require('fastify')({ logger: log });
const products = require('./data/get-products.json');

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_HOST ? `mongodb://${process.env.MONGO_HOST}:27017/buddy` : 'mongodb://localhost:27017/buddy';

const productApi = require('./src/api/product-api');

fastify.get('/', (request, reply) => {
  reply.send(products);
});

productApi(fastify);

fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: mongoUrl,
});

fastify.listen(port, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
