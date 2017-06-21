'use strict';

const groupCtrl = require('../controllers/group-controller');
const bearerAuth = require('../lib/bearer-auth-middleware');
const debug = require('debug')('ltg:group-routes');

module.exports = function(router) {
  router.post('/create', bearerAuth, (req, res) => {
    debug('POST group');

    groupCtrl.create(req)
    .then(group => res.json(group))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/group/:id', (req, res) => {
    debug('GET group');

    groupCtrl.getOne(req)
    .then(group => {
      res.json(group);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/feed', (req, res) => {
    debug('GET feed');

    groupCtrl.getAll()
    .then(feed => res.json(feed))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/group/:id/update', bearerAuth, (req, res) => {
    debug('PUT group');

    groupCtrl.update(req)
    .then(group => res.json(group))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/group/:id/delete', bearerAuth, (req, res) => {
    debug('Delete group');
    groupCtrl.remove(req)
    .then(() => res.status(204).send())
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
