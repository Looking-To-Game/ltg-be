'use strict';

const debug = require('debug')('ltg:basic-auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next) {
  debug('#basic-auth-middleware');

  let authHeaders = req.headers.authorization;
  
  /* istanbul ignore next */
  if(!authHeaders) return next(createError(401, 'Authorization headers required'));

  let base64Str = authHeaders.split('Basic ')[1];

  /* istanbul ignore next */
  if(!base64Str) return next(createError(401, 'Username and Password are required'));

  let [username, password] = new Buffer(base64Str, 'base64').toString().split(':');
  req.auth = {username, password};

  if(!req.auth.username) return next(createError(401, 'Username required'));
  if(!req.auth.password) return next(createError(401, 'Password required'));

  next();
};
