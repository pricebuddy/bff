const getMasterProduct = async (id, repositories) => {
  const response = await repositories.masterProductRepository.selectById(id);
  return response;
};

module.exports = { getMasterProduct };
