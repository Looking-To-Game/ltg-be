'use strict';

const userCtrl = require('../controllers/user-controller');
const debug = require('debug')('ltg:user-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {

  // Check that user is logged in, if not route to signin.
  router.get('/user', bearerAuth, (req, res) => {
    debug('GET user');
    return userCtrl.getUser(req)
    .then(userObject => res.json(userObject))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/user', bearerAuth, (req, res) => {
    debug('PUT user');
    return userCtrl.putUser(req)
    .then(userObject => res.json(userObject))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
