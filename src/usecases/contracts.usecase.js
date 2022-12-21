const contractDB = require('../infrastructure/database/contract');

exports.getContractById = async ({ profileId, contractId }) => {
  const contract = await contractDB.getContractById(profileId, contractId);

  if (!contract) 
      throw new Error('Contract not found');

  return contract;
};

exports.getContracts = async ({ profileId }) => {
  const contracts = await contractDB.getContracts(profileId);

  if (!contracts) 
      throw new Error('There is no contracts for the current profile');

  return contracts;
};
