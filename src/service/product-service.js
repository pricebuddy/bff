/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const DomainRepository = require('../repository/domain-repositories');

const { getCompetitors } = require('../use-cases/get-sellers');
const { getProductsBySellerId, getCompetitorProductsByParentId } = require('../use-cases/get-products');

function getElByPropVal(myArray, prop, val) {
  for (let i = 0, { length } = myArray; i < length; i++) {
    if (myArray[i][prop] == val) {
      return myArray[i];
    }
  }
}

const getProducts = async (fastify, req, reply) => {
  const domainRepository = new DomainRepository(fastify);

  const { id } = req.params;

  const competitors = await getCompetitors(domainRepository);
  const competitorIds = competitors.map((item) => item.id);
  const tenantProducts = await getProductsBySellerId(id, domainRepository);

  const response = [];
  await Promise.all(tenantProducts.map(async (product) => {
    try {
      const competitorProducts = await
      getCompetitorProductsByParentId(product.parentId, competitorIds, domainRepository);
      const competitorPrices = [];

      for (const competitorProduct of competitorProducts) {
        const competitor = getElByPropVal(competitors, 'id', competitorProduct.sellerId);
        competitorPrices.push({
          competitorsName: competitor.name,
          price: competitorProduct.price,
          competitorsUrl: competitorProduct.url,
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
