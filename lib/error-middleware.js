'use strict';

const debug = require('debug')('ltg:error-middleware');
const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('#error-middleware');

  if(err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'ValidationError') {
    err = createError(400, err.message);
    res.status(err.status).send(err.message);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
