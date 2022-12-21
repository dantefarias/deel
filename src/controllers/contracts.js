const contractsUseCase = require('../usecases/contracts.usecase')

exports.getContractById = async (req, res, next) => {
  try {
    const profileId = req.profile?.id;
    const contractId = req.params.id;
    const contract = await contractsUseCase.getContractById({ profileId, contractId });
    res.status(200).json(contract).end();
  } catch (error) {
    next(error);
  }
};

exports.getContracts = async (req, res, next) => {
  try {
    const profileId = req.profile?.id;
    const contracts = await contractsUseCase.getContracts({ profileId });
    res.status(200).json(contracts).end();
  } catch (error) {
    next(error);
  }
}; 