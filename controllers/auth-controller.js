'use strict';

const User = require('../model/user.js');
const debug = require('debug')('ltg:auth-controller');

module.exports = exports = {};

exports.signup = function(user, password) {
  debug('#Signup');

  return user.generatePasswordHash(password)
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
