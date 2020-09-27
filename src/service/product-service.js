/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');

const DomainRepository = require('../repository/domain-repositories');

const { getCompetitors } = require('../use-cases/get-sellers');
const { getProductsBySellerId, getCompetitorProductByParentIdAndCompetitorId } = require('../use-cases/get-products');

const getRecommendation = async (currentPrice, competitorPrices) => {
  const competitorPrice = competitorPrices.map((item) => item.price).filter(Boolean);

  const competitorStock = competitorPrices.map((item) => item.stock);

  const response = await axios.post('http://127.0.0.1:3000/v1/process', {
    sku: '1',
    category: '1',
    competitorStock,
    price: {
      currentPrice,
      competitorPrice,
    },
  });

  return response.data.suggestions;
};

const getProducts = async (fastify, req, reply) => {
  const domainRepository = new DomainRepository(fastify);

  const { id } = req.params;

  const competitors = await getCompetitors(domainRepository);
  const tenantProducts = await getProductsBySellerId(id, domainRepository);

  const response = [];
  await Promise.all(tenantProducts.map(async (product) => {
    try {
      const competitorPrices = [];

      for (const competitor of competitors) {
        const competitorProduct = await
        getCompetitorProductByParentIdAndCompetitorId(product.parentId, competitor.id, domainRepository);

        const competitorPrice = competitorProduct ? {
          competitorsName: competitor.name,
          price: competitorProduct.price,
          competitorsUrl: competitorProduct.url,
          stock: 1,
        } : {
          stock: 0,
        };

        competitorPrices.push(competitorPrice);
      }

      const recommendation = await
      getRecommendation(product.price, competitorPrices);

      response.push({ ...product, competitorPrices, recommendation });
    } catch (error) {
      fastify.log.error(`error ${error}`);
    }
  }));

  return reply.send(response);
};

module.exports = {
  getProducts,
};

//     "name": "nombre",
//     "thumbnail": "revisar",
//     "price": 23423,
//     "createdAt": Date,
//     "lastModifiedAt": Date,
//     "sku": "string",
//     "marketPrices": [
//       {
//         "price": 313221,
//         "competitorsName": "asdas",
//         "competitorsUrl": "https://paris.cl",
//         "shippingPrice": {
//           "min": 23312,
//           "max": 2342344,
//         },
//         "createdAt": Date,
//         "lastModifiedAt": Date,
//       }
//     ],
//     suggestion: {
//         "price": "increase",
//         "message": "Sube tu precio ☝️"
//     }
//   }
