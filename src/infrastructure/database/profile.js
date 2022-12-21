const { Profile } = require('../model');

exports.getProfileById = async (id, transactionOptions) => Profile.findOne({ where: { id }, ...transactionOptions});

exports.setNewBalance = async (balance, profile, transactionOptions) =>
  profile.update({ balance }, { where: {}, ...transactionOptions })