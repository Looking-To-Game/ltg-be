'use strict';

const userCtrl = require('../controllers/user-controller');
const debug = require('debug')('ltg:user-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.get('/user', bearerAuth, (req, res) => {
    debug('ltg:user-routes');
    return userCtrl.getUser(req)
    .then(userObject => res.json(userObject))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
