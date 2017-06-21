'use strict';

const createError = require('http-errors');
// const User = require('../model/user.js');

module.exports = exports = {};

exports.getUser = function(req) {
  if(!req.user) return Promise.reject(createError(400, 'Invalid username'));
  // Returns all object properties and sets some to null.
  req.user.password = null;
  req.user.findhash = null;
  req.user.__v = null;
  return Promise.resolve(req.user);

  // Returns only username and password.
  // let userObject = {
  //   username: req.user.username,
  //   email: req.user.email,
  // };
  // return Promise.resolve(userObject);
};

// Check that user is logged in, if not route to signin.
// GET request for that users information req.body
// PUT request to update any updates from user on submit.
// DELETE user will not currently be a supported feature.
