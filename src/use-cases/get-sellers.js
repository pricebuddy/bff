const getCompetitors = async (repositories) => {
  const response = await repositories.sellerRepository.selectAllCompetitors();
  return response;
};

module.exports = { getCompetitors };
