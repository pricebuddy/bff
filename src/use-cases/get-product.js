const getProduct = async (id, repositories) => {
  const response = await repositories.productRepository.selectById(id);
  return response;
};

const getProductBySku = async (sku, sellerId, repositories) => {
  const response = await repositories.productRepository.selectBySku(sku, sellerId);
  return response;
};

module.exports = { getProduct, getProductBySku };
