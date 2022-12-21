const adminUseCase = require('../usecases/admin.usecase')

exports.getBestProfession = async (req, res, next) => {
  try {
    const params = {
      start: req.query.start,
      end: req.query.end
    }
    
    const profession = await adminUseCase.getBestProfession(params);
    res.status(200).json(profession).end();
  } catch (error) {
    next(error);
  }
}; 

exports.getBestClients = async (req, res, next) => {
  try {
    const params = {
      start: req.query.start,
      end: req.query.end,
      limit: req.query.limit || 2,
    }
    
    const profession = await adminUseCase.getBestClients(params);
    res.status(200).json(profession).end();
  } catch (error) {
    next(error);
  }
}; 