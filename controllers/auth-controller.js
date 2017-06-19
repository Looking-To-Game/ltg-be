'use strict';

const User = require('../model/user.js');
const debug = require('debug')('lfg:auth-controller');

module.exports = exports = {};

exports.signup = function(user, password) {
  debug('#Signup');

  return User.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .catch(err => err);
};

exports.signin = function(username, password) {
  debug('#Signin');

  return User.findOne({username: username})
  .then(user => user.comparePasswordHash(password))
  .then(user => user.generateToken())
  .catch(err => err);
};
