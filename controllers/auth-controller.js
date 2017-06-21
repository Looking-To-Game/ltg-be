'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../model/user.js');

module.exports = exports = {};

exports.signup = function(req) {
  if(!req.body.password) return Promise.reject(createError(400, 'Invalid password'));

  let tempPassword = null;
  tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => {
    return user.generateToken();
  });
};

exports.signin = function(req) {
  if(!req.auth.username) return Promise.reject(createError(400, 'Invalid username'));

  if(!req.auth.password) return Promise.reject(createError(400, 'Invalid password'));

  return User.findOne({username: req.auth.username})
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => token)
  .catch(err => createError(404, err.message));
};
