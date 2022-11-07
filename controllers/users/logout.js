const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  throw RequestError(204);
};

module.exports = logout;
