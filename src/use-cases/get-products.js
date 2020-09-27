/* eslint-disable max-len */
const getProductsBySellerId = async (sellerId, repositories) => {
  const response = await repositories.productRepository.sellectProductsBySeller(sellerId);
  return response;
};

const getCompetitorProductByParentIdAndCompetitorId = async (parentId, competitorId, repositories) => {
  const response = await
  repositories.productRepository.selectCompetitorProductsByParentIdAndCompetitorId(parentId, competitorId);
  return response;
};

module.exports = { getProductsBySellerId, getCompetitorProductByParentIdAndCompetitorId };
