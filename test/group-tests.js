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
let id;

mongoose.Promise = Promise;

describe('Group Routes', function () {
  before(done => {
    chai.request(server)
    .post('/api/signup')
    .send(user)
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
        expect(res.status).to.equal(200);
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
          id = res.body._id;
          expect(id).to.exist;
          done();
        });
      });
    });
    describe('Get /api/group/:_id', function () {
      before(done => {
        chai.request(server)
        .post('/api/create')
        .send(group)
        .set({
          Authorization: `Bearer ${userToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          id = res.body._id;
          done();
        });
      });
      before(done => {
        chai.request(server)
        .get(`/api/group/${id}`)
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
    });
  });
  describe('PUT /api/group/:_id/update', function (){
    before(done => {
      chai.request(server)
      .put(`/api/group/${id}/update`)
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .send({
        title: 'Destiny 2',
        description: 'Need competitve players for awesomeness',
      })
      .end((err, res) => {
        if(err) return done(err);
        this.res = res;
        done();
      });
    });
    it('should keep it\'s id', done => {
      expect(this.res.body._id).to.equal(id);
      done();
    });
    it('should have a new title', done => {
      expect(this.res.body.title).to.equal('Destiny 2');
      done();
    });
    it('should have a status code of 200', done => {
      expect(this.res.status).to.equal(200);
      done();
    });
  });
  describe('DELETE /api/group/:_id/delete', function () {
    before(done => {
      chai.request(server)
      .delete(`/api/group/${id}/delete`)
      .set({
        Authorization: `Bearer ${userToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        this.res = res;
        done();
      }) ;
    });
    it('should return status code 204', done => {
      expect(this.res.status).to.equal(204);
      done();
    });
    it('should not have a content', done => {
      expect(this.res.body).to.not.exist;
      done();
    });
  });
});
