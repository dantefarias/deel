const jobDB = require('../infrastructure/database/job');
const profileDB = require('../infrastructure/database/profile');
const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('../../src/infrastructure/model');

exports.getUnpaidJobs = async ({ profileId }) => {
  const jobs = await jobDB.getUnpaidJobs(profileId);

  if (!jobs)
    throw new Error('There is no contracts for the current profile');

  return jobs;
};

exports.setJobPayment = async ({ profileId, jobId }) => {
  const tx = await sequelize.transaction();
  const transactionOptions = { transaction: tx };
  try {
    const job = await jobDB.getJob(profileId, jobId, { ...transactionOptions, Lock: tx.LOCK.UPDATE });

    if (!job || job.paid)
      throw new Error('There is not unpaid job');

    const [clientProfile, contractorProfile] = await Promise.all([
      profileDB.getProfileById(profileId, { ...transactionOptions, Lock: tx.LOCK.UPDATE }),
      profileDB.getProfileById(job.Contract?.ContractorId, { ...transactionOptions, Lock: tx.LOCK.UPDATE })
    ]);

    const clientBalance = clientProfile.balance;
    const contractorBalance = contractorProfile.balance;
    const jobPrice = job.price;

    if (jobPrice > clientBalance)
      throw new Error('Not enough funds');
    

    const clientNewBalance = clientBalance - jobPrice;
    const contractorNewBalance = contractorBalance + jobPrice;


    const [updatedJob, updatedClientBalance, updatedContractorBalance] = await Promise.all([
      jobDB.setPayment(job, transactionOptions),
      profileDB.setNewBalance(clientNewBalance, clientProfile, transactionOptions),
      profileDB.setNewBalance(contractorNewBalance, contractorProfile, transactionOptions)
    ]);

    await tx.commit();

    return ({
      ...updatedClientBalance.dataValues,
      amountPaid: jobPrice,
    })

  } catch (error) {
    await tx.rollback();
    throw error;
  }
};
