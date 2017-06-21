'use strict';

const createError = require('http-errors');
// const Promise = require('bluebird');
const User = require('../model/user.js');

module.exports = exports = {};

exports.getUser = function(req) {
  // Working basic auth.
  // if(!req.auth.username) return Promise.reject(createError(400, 'Invalid username'));
  //
  // if(!req.auth.password) return Promise.reject(createError(400, 'Invalid password'));
  //
  // return User.findOne({username: req.auth.username})
  // .then(user => user.comparePasswordHash(req.auth.password))
  // .then(user => user.generateToken())
  // .then(token => token)
  // .catch(err => createError(404, err.message));

  // console.log('Log request: ', req.body);
  // return User.findOne({username: req.body})
  // User.findOne({username: req.body})
  // User.findById(req.params.id);
  console.log('Log req.params.id', req.params.id);
  console.log('Log req.auth.username', req.auth.username);
  // .then(user => res.json(user));
  // .catch(err => createError(404, err.message));
};

// Check that user is logged in, if not route to signin.
// GET request for that users information req.body
// PUT request to update any updates from user on submit.
// DELETE user will not currently be a supported feature.

// User model.
// const userSchema = Schema({
//   username: {type: String, required: true, unique: true},
//   email: {type: String, required: true, unique: true},
//   password: {type:String, required:true},
