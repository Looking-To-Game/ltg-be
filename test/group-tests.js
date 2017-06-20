'use strict';

const expect = require('chai').expect;
const chai = require('chai');
const mongoose = require('mongoose');
const http = require('chai-http');
const Promise = require('bluebird');

const User = require('../model/user');

const server = require('../server.js');
chai.use(http);

const user = {
  username: 'testy',
  password: 'supersecret',
  email: 'fake@fake.com',
};

const group = {
  title: 'Halo 15',
  description: 'longest running video game of all time',
  host: 'testy',
  game: 'Halo 5',
  platform: 'Xbox',
  skillLevel: 'Death',
  dedication: 'casual',
  groupSize: 2000000,
  startTime: Date.now(),
  endTime: Date.now(),
};

let userToken;

mongoose.Promise = Promise;

describe('Group Routes', function () {
  before(done => {
    chai.request(server)
    .post('/api/signup')
    .send(user)
    .end(token => {
      userToken = token;
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
  describe('POST /api/create', function (){
    it('should create a new group', done => {
      chai.request(server)
      .post('/api/create')
      .send(group)
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(201);
        done();
      });
      it('should send back object title', done => {
        chai.request(server)
        .post('/api/create')
        .send(group)
        .set({
          Authorization: `Bearer ${userToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.title).to.equal('Halo 15');
          done();
        });
      });
      it('should send back object properties', done => {
        chai.request(server)
        .post('/api/create')
        .send(group)
        .set({
          Authorization: `Bearer ${userToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.game).to.equal('Halo 5');
          done();
        });
      });
      it('should create a new group', done => {
        chai.request(server)
        .post('/api/create')
        .send(group)
        .set({
          Authorization: `Bearer ${userToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body._id).to.exist;
          done();
        });
      });
    });
    describe('Get /api/group/:_id', function () {
      chai.require(server)
      .get('/api/group/:_id')
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
      })
    });
  });
});
