const jobsUseCase = require('../usecases/jobs.usecase')

exports.getUnpaidJobs = async (req, res, next) => {
  try {
    const profileId = req.profile?.id;
    const jobs = await jobsUseCase.getUnpaidJobs({ profileId });
    res.status(200).json(jobs).end();
  } catch (error) {
    next(error);
  }
}; 

exports.setJobPayment = async (req, res, next) => {
  try {
    const profileId = req.profile?.id;
    const jobId = req.params.job_id;
    const paidJob = await jobsUseCase.setJobPayment({ profileId, jobId });
    res.status(200).json(paidJob).end();
  } catch (error) {
    next(error);
  }
}; 