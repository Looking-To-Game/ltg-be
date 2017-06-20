'use strict';

const groupCtrl = require('../controllers/group-controller');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.post('/create', bearerAuth, (req, res) => {
    groupCtrl.create(req)
    .then(group => res.json(group))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/group/:id', (req, res) => {
    groupCtrl.getOne(req)
    .then(group => res.json(group))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/group/:id/update', bearerAuth, (req, res) => {
    groupCtrl.update(req)
    .then(group => res.json(group))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/group/:id/delete', bearerAuth, (req, res) => {
    groupCtrl.remove(req)
    .then(() => res.status(204))
    .catch(err => res.status(err.status).send(err.message));
  });
  
  return router;
};
