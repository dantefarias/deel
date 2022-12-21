const jobDB = require('../infrastructure/database/job');
const profileDB = require('../infrastructure/database/profile');
const { sequelize } = require('../../src/infrastructure/model');

const validateDeposit = (debt, amountToDeposit) => {
  const depositLimit = 0.25 * debt;

  if (depositLimit < amountToDeposit)
    throw new Error('Amount to deposit has exceeded the limit allowed')
}

exports.deposit = async ({ userId, amount }) => {
  const tx = await sequelize.transaction();
  const transactionOptions = {
    transaction: tx,
    lock: tx.LOCK.UPDATE
  }
  try {
    const jobsDebtByClient = await jobDB.getJobsDebtByClient(userId, transactionOptions);
    const clientDebt = jobsDebtByClient.dataValues?.debt;
    if (!clientDebt) {
      throw new Error('There is no debt on the current clientId')
    }

    validateDeposit(clientDebt, amount);

    const clientProfile = await profileDB.getProfileById(userId, transactionOptions);

    if (!clientProfile) {
      throw new Error('Client not found')
    }
    
    const newBalance = clientProfile.balance + Number(amount);
    await profileDB.setNewBalance(newBalance, clientProfile, { transaction: tx});
  
    await tx.commit();

    return {
      userId: userId,
      depositAmount: amount
    }

  } catch (error) {
    await tx.rollback();
    throw error;
  }
};