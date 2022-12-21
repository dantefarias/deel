const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('../model');

exports.getBestProfession = async ({ startDate, endDate }) => Profile.findAll({
  attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'amount']],
  include: { 
    model: Contract, 
    as: 'Contractor',
    include: {
      model: Job,
      where: {
        paid: { [Op.is]: 1},
        paymentDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        }
      }
    }
  },
  group: 'profession',
  order: [['amount', 'DESC']],
  limit: 1,
  subQuery: false
});

exports.getBestClients = async ({ startDate, endDate, limit }) => Profile.findAll({
  attributes: ['firstName', 'lastName',[sequelize.fn('SUM', sequelize.col('price')), 'amount']],
  include: { 
    model: Contract, 
    as: 'Client',
    include: {
      model: Job,
      where: {
        paid: { [Op.is]: 1},
        paymentDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        }
      }
    }
  },
  where: {
    type: { [Op.eq]: 'client' }
  },
  group: 'ClientId',
  order: [['amount', 'DESC']],
  limit,
  subQuery: false
});