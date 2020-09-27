const DomainRepository = require('../repository/domain-repositories');

const { getCompetitors, getSellerById } = require('../use-cases/get-sellers');
const { getProductsBySellerId, getProductsByParentProductId } = require('../use-cases/get-products');

const getProducts = async (fastify, req, reply) => {
  const domainRepository = new DomainRepository(fastify);

  const { tenantId } = req.params;

  const tenantProducts = await getProductsBySellerId(tenantId, domainRepository);

  const response = await tenantProducts.forEach(async (product) => {
    const competitorProducts = await getProductsByParentProductId(product.parentId);
  });

  return response;
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
