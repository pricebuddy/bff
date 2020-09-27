const getProductBySku = async (sku, sellerId, repositories) => {
  const response = await repositories.productRepository.selectBySku(sku, sellerId);
  return response;
};

module.exports = { getProductBySku };
