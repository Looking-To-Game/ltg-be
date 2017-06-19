'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');

mongoose.Promise = Promise;

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  // fullName: 'exampleuser',
  // password: '1234',
  // email: 'exampleuser@test.com',
  username: 'GamerX7',
  password: 'totallysecret',
  email: 'totallyreal@email.com',
};

describe('User Routes Test', function() {
  afterEach(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('POST /api/signup', function() {
    before(done => {
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
      .catch(() => done());
    });

    after( done => {
      User.remove({})
      .then(() => done())
      .catch(() => done());
    });

    it('should return a new user', done => {
      request.post(`${url}/api/signup`)
      .send(exampleUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.equal(200);
        console.log(res.text);
        expect(res.text).to.be.a('string');
        done();
      });
    });
  });
});
