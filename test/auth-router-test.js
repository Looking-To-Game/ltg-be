'use strict';

// require('./lib/test-env.js');
const chai = require('chai');
const expect = chai.expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
const http = require('chai-http');

const User = require('../model/user.js');
const server = require('../server.js');
chai.use(http);

mongoose.Promise = Promise;

const user = {
  username: 'testy',
  password: 'abc123',
  email: 'fake@fake.com',
};

describe('User auth routes', function() {
  afterEach(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('Unregistered route', function() {
    it('should throw a 404 error', done => {
      chai.request(server)
      .post('/api')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should throw a a 401 with no username', done => {
      chai.request(server)
      .post('/api/signup')
      .send({
        username: '',
        password: 'abc123',
        email: 'fake@fake.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
      });
      done();
    });
    it('should throw a a 401 with no password', done => {
      chai.request(server)
      .post('/api/signup')
      .send({
        username: 'abc123',
        password: '',
        email: 'fake@fake.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST tests', function() {
    it('should create a new user', done => {
      chai.request(server)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should throw a 400 error if given no body', done => {
      chai.request(server)
      .post('/api/signup')
      .send('')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET tests', function() {
    before(done => {
      chai.request(server)
      .post('/api/signup')
      .send(user)
      .end(() => done());
    });


    it('should return the user if given the correct credentials', done => {
      chai.request(server)
      .get('/api/signin')
      .auth(user.username, user.password)
      .end((err, res) => {
        expect(res.text).to.be.a('string');
        done();
      });
    });

    it('should return the user if given the correct credentials', done => {
      chai.request(server)
      .get('/api/signin')
      .auth(user.username, user.password)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
