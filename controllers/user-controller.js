'use strict';

const createError = require('http-errors');
const User = require('../model/user.js');
const debug = require('debug')('ltg:user-contrlller');

module.exports = exports = {};

// GET request for that users information req.body
exports.getUser = function(req) {
  debug('#getUser');
  if(!req.user) return Promise.reject(createError(400, 'Bad request, invalid user'));

  // Returns all object properties and sets some to null.
  req.user.password = null;
  req.user.findhash = null;
  req.user.__v = null;
  return Promise.resolve(req.user);
};

// PUT request to update any updates from user on submit.
exports.putUser = function(req) {
  debug('#putUser');
  if(!req.user._id) return Promise.reject(createError(400, 'Bad request, user id required'));
  return User.findByIdAndUpdate(req.user._id, {$set: {
    username: req.body.username,
    email: req.body.email,
    steam: req.body.steam,
    bn: req.body.bn,
    xbl: req.body.xbl,
    psn: req.body.psn,
    lol: req.body.lol,
  }}, {new: true})
  .then(user => {
    user.password = null;
    user.findhash = null;
    return user;
  })
  .catch(err => err);
};
