const register = require('./register');
const verify = require('./verify');
const resendEmail = require('./resendEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSub = require('./updateSub');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  verify,
  login,
  getCurrent,
  logout,
  updateSub,
  updateAvatar,
  resendEmail,
};
