'use strict';

// const Router = require('express').Router;
//const createError = require('http-errors');
// const User = require('../models/user');
const userController = require('../controllers/user-controller');
const debug = require('debug')('ltg:user-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

//const userRouter = module.exports = Router();

module.exports = function(router) {
  router.get('/user/:id', bearerAuth, (req, res, next) => {
    debug('#GET /api/user/');
    console.log('Req body user', req.body.user);
    //console.log('Req body user id', req.body.user.id);
    userController.fetchUserPage(req.body.user, req.params.id)
    //.catch(err => Promise.reject(createError(400, err.message)))
    .then(user => {
      // if(user.userId.toString() !== req.user._id.toString()) {
      //   return Promise.reject(createError(401, 'invalid userid'));
      // }
      res.json(user);
    })
    .catch(next);
  });

  return router;
};
