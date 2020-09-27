/* eslint-disable no-restricted-syntax */
const DomainRepository = require('../repository/domain-repositories');

const { getProductsBySellerId, getProductsByParentId } = require('../use-cases/get-products');

const getProducts = async (fastify, req, reply) => {
  const domainRepository = new DomainRepository(fastify);

  const { id } = req.params;

  const tenantProducts = await getProductsBySellerId(id, domainRepository);

  const response = [];
  await Promise.all(tenantProducts.map(async (product) => {
    try {
      const competitorProducts = await getProductsByParentId(product.parentId, domainRepository);
      const competitorPrices = [];

      for (const competitorProduct of competitorProducts) {
        competitorPrices.push({
          price: competitorProduct.price,
        });
      }

      response.push({ ...product, competitorPrices });
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
