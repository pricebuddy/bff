const getProductsBySellerId = async (sellerId, repositories) => {
  const response = await repositories.productRepository.selectBySellerId(sellerId);
  return response;
};

const getProductsByParentProductId = async (masterid, repositories) => {
  const response = await repositories.productRepository.selectByMasterId(masterid);
  return response;
};

module.exports = { getProductsBySellerId, getProductsByParentProductId };
