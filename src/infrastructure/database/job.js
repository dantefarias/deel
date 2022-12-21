const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('../model');

exports.getUnpaidJobs = async (profileId) => Job.findAll({
  include: { model: Contract, 
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: { [Op.is]: 'in_progress' }
    }
  },
  where: {
    paid: { [Op.is]: null}
  }

});

exports.getJob = async (profileId, jobId, transactionOptions) => Job.findOne({
  where: {
    id: {
      [Op.eq]: jobId,
    }
  },
  include: {
    model: Contract,
    as: 'Contract',
    where: {
      clientId: {
        [Op.eq]: profileId,
      },
    }
  },
  ...transactionOptions
});

exports.setPayment = async (job, transaction) => job.update({ paid: 1, paymentDate: new Date() },  { where: {}, ...transaction })

exports.getJobsDebtByClient = async (ClientId, transactionOptions) => Job.findOne({
  attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'debt']],
  where: {
    paid: { [Op.is]: null}
  },
  include: { 
    model: Contract, 
    as: 'Contract',
    where: {
      ClientId: { [Op.eq]: ClientId },
      status: { [Op.eq]: 'in_progress' }
    }
  },
  ...transactionOptions
});
