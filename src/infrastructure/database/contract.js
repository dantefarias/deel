const { Op } = require('sequelize');
const { Contract } = require('../model');

exports.getContractById = async (profileId, contractId) => Contract.findOne({
  where: {
    id: contractId,
    [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
  },
});

exports.getContracts = async (profileId) => Contract.findAll({
  where: {
    [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    status: { [Op.ne]: 'terminated' }
  },
});
