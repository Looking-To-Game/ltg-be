'use strict';

const debug = require('debug')('lfg:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../model/user.js');
const UserCtrl = require('../controllers/auth-controller.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    let tempPassword = req.body.password;
    req.body.passowrd = null;
    delete req.body.password;

    let newUser = new User(req.body);

    return UserCtrl.signup(newUser, tempPassword)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return UserCtrl.signin(req.body.username, req.body.password)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  return router;
};
