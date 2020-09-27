const getProduct = async (id, repositories) => {
  const response = await repositories.productRepository.selectById(id);
  return response;
};

module.exports = { getProduct };
