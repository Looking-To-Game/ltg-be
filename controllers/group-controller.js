'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Group = require('../model/group.js');
const debug = require('debug')('ltg:group-contrlller');

module.exports = exports = {};

exports.create = function(req) {
  debug('#create');

  req.body.host = req.user.username;

  if(!req.body) return Promise.reject(createError(400, 'Content required'));
  return new Group(req.body).save();
};

exports.getOne = function(req) {
  debug('#getOne');

  if(!req.params.id) return Promise.reject(createError(400, 'Group id required'));

  return Group.findById(req.params.id)
  .then(group => {
    if(group._id.toString() !== req.params.id) return createError(400, 'Invalid group');
    return group.save();
  });
};

exports.getAll = function() {
  debug('#getAll');

  return Group.find()
  .then(feed => {
    return feed;
  });
};

exports.update = function(req) {
  debug('#update');

  if(!req.params.id) return Promise.reject(createError(400, 'Group id required'));
  return Group.findByIdAndUpdate(req.params.id, { $set: {
    title: req.body.title,
    description: req.body.description,
    game: req.body.game,
    platform: req.body.platform,
    skillLevel: req.body.skillLevel,
    dedication: req.body.dedication,
    groupSize: req.body.groupSize,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  }}, {new: true})
  .then(group => group)
  .catch(err => err);
};

exports.remove = function(req) {
  debug('#remove');

  if(!req.params.id) return Promise.reject(createError(400, 'Group id required'));
  return Group.findByIdAndRemove(req.params.id);
};
