'use strict';

// const Router = require('express').Router;
// const createError = require('http-errors');
// const User = require('../models/user');
const userCtrl = require('../controllers/user-controller');
// const debug = require('debug')('ltg:user-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');
// const basicAuth = require('../lib/basic-auth-middleware');

// 1 server > 2 user-routes > 3 user-controller
module.exports = function(router) {
  // Working basic auth.
  // router.get('/user', basicAuth, (req, res) => {
    // userCtrl.getUser(req)
    // .then(token => res.json(token))
    // .catch(err => res.status(err.status).send(err.message));

    // console.log('Log request: ', req);
    // req object IncomingMessage is very long.
    // req.body is an empty object.

    // console.log('Log response: ', res);
    // res object ServerResponse is also very long.
    // params: {}, query: {}, body: {} are empty.
    // auth: { username: '', password: '' } }
  // });

  router.get('/user', bearerAuth, (req, res) => {
    return userCtrl.getUser(req)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};

/* // 17 gallery-routes
  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');

    return Gallery.findById(req.params.id)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status).send(err.message));
  });
*/

/* // 27 gallery-router
galleryRouter.get('/api/gallery/:id', bearerAuth, itemQueries,  function(req, res, next){
  debug('GET /api/gallery/:id')
  Gallery.findById(req.params.id)
  .populate({
    path: 'pics',
    options: {
      sort: {_id: req.query.itemsort},
      limit: req.query.itemcount,
      skip: req.query.itemoffset,
    },
  })
  .catch(err => Promise.reject(createError(400, err.message)))
  .then(gallery => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'))
    res.json(gallery)
  })
  .catch(next)
})
*/
