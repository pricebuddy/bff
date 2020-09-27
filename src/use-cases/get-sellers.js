const getAllSellers = async (repositories) => {
  const response = await repositories.sellerRepository.selectAll();
  return response;
};

const getCompetitors = async (repositories) => {
  const response = await repositories.sellerRepository.selectAllCompetitors();
  return response;
};

const getSellerById = async (repositories) => {
  const response = await repositories.sellerRepository.selectbyId();
  return response;
};

module.exports = { getAllSellers, getCompetitors, getSellerById };
