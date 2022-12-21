const {getProfile} = require('../middleware/getProfile');
const contracts = require('../controllers/contracts');
const jobs = require('../controllers/jobs');
const admin = require('../controllers/admin');
const balances = require('../controllers/balances')

exports.init = app => {

  /***************************** 
   ******** Contracts **********
  ******************************/
  app.get('/contracts/:id', getProfile, contracts.getContractById)
  app.get('/contracts', getProfile, contracts.getContracts)

  app.get('/jobs/unpaid', getProfile, jobs.getUnpaidJobs)
  app.post('/jobs/:job_id/pay', getProfile, jobs.setJobPayment)

  app.get('/admin/best-profession', admin.getBestProfession)
  app.get('/admin/best-clients', admin.getBestClients)

  app.post('/balances/deposit/:userId', balances.deposit)

  
}