const DomainRepository = require('../repository/domain-repositories');

const { getAllSellers } = require('../use-cases/get-sellers');

const getProduct = async (fastify) => {
  const response = { name: '' };

  return response;
};

const getProducts = async (fastify) => {
  const response = { name: '' };

  return response;
};

module.exports = {
  getProduct,
  getProducts,
};

// {
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
