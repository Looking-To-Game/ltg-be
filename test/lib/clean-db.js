'use strict';

const debug = require('debug')('cfgram:clean-db');

const Group = require('../../model/group.js');
const User = require('../../model/user.js');

module.exports = function(done) {
  debug('clean up database');
  Promise.all([
    Group.remove({}),
    User.remove({}),
  ])
  .then(() => done())
  .catch(done);
};
