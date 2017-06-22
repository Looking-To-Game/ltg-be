'use strict';

const debug = require('debug')('cfgram:user-mock');
const User = require('../../model/user.js');

module.exports = function(done) {
  debug('Create mock User');

  let username = 'tedsters';
  let password = 'supersecret';
  let email = 'dave@teddy.com';
  let exampleUser = {
    username,
    password,
    email,
  };
  this.tempPassword = password;
  new User(exampleUser)
  .generatePasswordHash(exampleUser.password)
  .then(user => user.save())
  .then(user => {
    this.tempUser = user;
    return user.generateToken();
  })
  .then(token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
