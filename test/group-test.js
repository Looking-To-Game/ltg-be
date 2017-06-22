'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const serverCtrl = require('./lib/server-ctrl.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/user-mock.js')


mongoose.Promise = Promise;

const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const user = {
  username: 'testy',
  password: 'supersecret',
  email: 'fake@fake.com',
};

const group = {
  title: 'Halo 15',
  description: 'longest running video game of all time',
  game: 'Halo 5',
  platform: 'Xbox',
  skillLevel: 'Death',
  dedication: 'casual',
  groupSize: 2000000,
  startTime: Date.now(),
  endTime: Date.now(),
};

describe('Testing Group Test', function() {
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('Testing POST Route /api/create', function() {
    describe('That it has creates a body', function() {
      before(done => mockUser.call(this, done));
      it('should create a new object', done => {
        request.post(`${url}/api/create`)
        .send(group)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.title).to.be.equal('Halo 15');
        });
      });
    });
  });
});
