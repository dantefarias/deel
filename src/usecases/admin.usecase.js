const moment = require('moment');
const adminDB = require('../infrastructure/database/admin');

exports.getBestProfession = async ({start, end}) => {
  const formattedDate = {
    startDate: start && moment(start).format('YYYY-MM-DD HH:mm:ss'),
    endDate: end && moment(end).format('YYYY-MM-DD HH:mm:ss')
  }

  const profession = await adminDB.getBestProfession(formattedDate);

  return profession;
};

exports.getBestClients = async ({start, end, limit}) => {
  const formattedParams = {
    startDate: start && moment(start).format('YYYY-MM-DD HH:mm:ss'),
    endDate: end && moment(end).format('YYYY-MM-DD HH:mm:ss'),
    limit
  }

  const clients = await adminDB.getBestClients(formattedParams);

  return clients;
};