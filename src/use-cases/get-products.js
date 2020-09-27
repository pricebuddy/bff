const getProductsBySellerId = async (sellerId, repositories) => {
  const response = await repositories.productRepository.sellectProductsBySeller(sellerId);
  return response;
};

const getProductsByParentId = async (parentId, repositories) => {
  const response = await repositories.productRepository.selectByParentId(parentId);
  return response;
};

module.exports = { getProductsBySellerId, getProductsByParentId };
