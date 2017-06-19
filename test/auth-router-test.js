'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
const request = require('superagent');
const User = require('../model/user.js');

mongoose.Promise = Promise;

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'GamerX7',
  password: 'totallysecret1234',
  email: 'totallyreal@email.com',
};

describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    after(done => {
      User.remove({})
      .then(() => done())
      .catch(done);
    });

    it('should return a token', done => {
      request.post(`${url}/api/signup`)
      .send(exampleUser)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.text).to.be.a('string');
        done();
      });
    });

    it('should return a status 200', done => {
      request.post(`${url}/api/signup`)
      .send(exampleUser)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('GET: /api/signin', function() {
    before(done => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    after(done => {
      User.remove({})
      .then(() => done())
      .catch(done);
    });

    it('should return a 200 status', done => {
      request.get(`${url}/api/signin`)
      .auth(exampleUser.username, exampleUser.password)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should return a token', done => {
      request.get(`${url}/api/signin`)
      .auth(exampleUser.username, exampleUser.password)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.text).to.be.a('string');
        done();
      });
    });
  });
});
