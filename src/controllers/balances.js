const balancesUseCase = require('../usecases/balances.usecase')

exports.deposit = async (req, res, next) => {
  try {
    const userId = req.params?.userId;
    const amount = req.body?.amount;
  
    const paidJob = await balancesUseCase.deposit({ userId, amount });
    res.status(200).json(paidJob).end();
  } catch (error) {
    next(error);
  }
}; 