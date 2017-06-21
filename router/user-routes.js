'use strict';

// const Router = require('express').Router;
// const createError = require('http-errors');
// const User = require('../models/user');
const userCtrl = require('../controllers/user-controller');
// const debug = require('debug')('ltg:user-routes');
// const bearerAuth = require('../lib/bearer-auth-middleware');
const basicAuth = require('../lib/basic-auth-middleware');

module.exports = function(router) {
  router.get('/user', basicAuth, (req, res) => {
    userCtrl.getUser(req)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err.message));
    // console.log('Log request: ', req);
    // req object IncomingMessage is very long.
    // req.body is an empty object.

    // console.log('Log response: ', res);
    // res object ServerResponse is also very long.
    // params: {}, query: {}, body: {} are empty.
    // auth: { username: '', password: '' } }
  });
  return router;
};
