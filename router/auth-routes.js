'use strict';

const userCtrl = require('../controllers/auth-controller');
const basicAuth = require('../lib/basic-auth-middleware');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    userCtrl.signup(req)
    .then(token => {
      return res.send(token);
    })
    .catch(err => res.status(err.status).send(err.message));
  });
  router.get('/signin', basicAuth, (req, res) => {
    userCtrl.signin(req)
    .then(token => res.send(token))
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
