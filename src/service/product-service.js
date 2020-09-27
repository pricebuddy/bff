/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');

const DomainRepository = require('../repository/domain-repositories');

const { getCompetitors } = require('../use-cases/get-sellers');
const { getMasterProduct } = require('../use-cases/get-master-product');
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

      const masterProduct = await getMasterProduct(product.parentId, domainRepository);

      for (const competitor of competitors) {
        const competitorProduct = await
        getCompetitorProductByParentIdAndCompetitorId(product.parentId, competitor.id, domainRepository);

        const competitorPrice = competitorProduct ? {
          competitorsName: competitor.name,
          price: parseInt(competitorProduct.price.trim(), 10),
          competitorsUrl: competitorProduct.url,
          stock: 1,
        } : {
          stock: 0,
        };

        competitorPrices.push(competitorPrice);
      }

      const recommendation = await getRecommendation(product.price, competitorPrices);

      response.push({
        ...product,
        name: masterProduct.name,
        price: parseInt(product.price, 10),
        competitorPrices,
        recommendation,
      });
    } catch (error) {
      fastify.log.error(`error ${error}`);
    }
  }));

  return reply.send(response);
};

module.exports = {
  getProducts,
};
