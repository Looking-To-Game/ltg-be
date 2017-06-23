'use strict';

// require('./lib/test-env.js');
const expect = require('chai').expect;
const chai = require('chai');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const http = require('chai-http');

const User = require('../model/user');
const server = require('../server.js');
chai.use(http);

const testUser = {
  username: 'teddy',
  email: 'teddy@bear.com',
  password: 'bear-auth',
  steam: 'hot',
  bn: 'skynet',
  xbl: 'snl',
  psn: 'funguy',
};

const newUser = {
  username: 'teds',
  email: 'ted@bear.com',
  password: 'bear-auth-new',
  steam: 'hot-dog',
  bn: 'skynet-is-life',
  xbl: 'snl-fun',
  psn: 'funguy-no',
};

let userToken;

mongoose.Promise = Promise;

describe('User routes', function() {
  before(done => {
    chai.request(server)
    .post('/api/signup')
    .send(testUser)
    .end((err, res) => {
      userToken = res.text;
      done();
    });
  });

  after(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });


  describe('GET /api/user', () => {
    before(done => {
      chai.request(server)
      .get('/api/user')
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        this.res = res;
        done();
      });
    });

    it('should return a status code of 200', done => {
      expect(this.res.status).to.equal(200);
      done();
    });
    it('should return an object', done => {
      expect(this.res.body).to.be.an('object');
      done();
    });
    it('should return an id', done => {
      expect(this.res.body._id).to.exist;
      done();
    });

    it('should get user object properties', () => {
      it('should keep it\'s id', done => {
        expect(this.res.body._id).to.equal(this.id);
        done();
      });

      it('should return username', done => {
        expect(this.res.body.username).to.equal('teddy');
        done();
      });
      it('should return email', done => {
        expect(this.res.body.email).to.equal('teddy@bear.com');
        done();
      });
      it('should return password', done => {
        expect(this.res.body.password).to.equal('bear-auth');
        done();
      });
      it('should return steam account', done => {
        expect(this.res.body.steam).to.equal('hot');
        done();
      });
      it('should return battlenet account', done => {
        expect(this.res.body.bn).to.equal('skynet');
        done();
      });
      it('should return xbox account', done => {
        expect(this.res.body.xbl).to.equal('snl');
        done();
      });
      it('should return playstation account', done => {
        expect(this.res.body.psn).to.equal('funguy');
        done();
      });
    });
  });
  describe('PUT /api/create', function () {
    before(done => {
      chai.request(server)
      .put('/api/user')
      .send(newUser)
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        this.res = res;
        done();
      });
    });
    it('should respond with a 201 with a good request', done => {
      expect(this.res.status).to.equal(200);
      done();
    });
    it('should return a the new username', done => {
      expect(this.res.body.username).to.equal('teds');
      done();
    });
  });
});
