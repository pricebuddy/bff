const getProductsBySellerId = async (sellerId, repositories) => {
  const response = await repositories.productRepository.sellectProductsBySeller(sellerId);
  return response;
};

const getCompetitorProductsByParentId = async (parentId, competitorIds, repositories) => {
  const response = await
  repositories.productRepository.selectCompetitorProductsByParentId(parentId, competitorIds);
  return response;
};

module.exports = { getProductsBySellerId, getCompetitorProductsByParentId };
