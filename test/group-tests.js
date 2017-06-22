'use strict';

// require('./lib/test-env.js');
const expect = require('chai').expect;
const chai = require('chai');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const http = require('chai-http');

const User = require('../model/user');
const Group = require('../model/group');
const server = require('../server.js');
const mockUser = require('./lib/user-mock.js');
chai.use(http);
//
mongoose.Promise = Promise;
// // eslint-disable-next-line
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



describe('Group Routes', function(){
  before(mockUser.bind(this));
  after(done => {
    Promise.all([
      User.remove({}),
      Group.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });
  describe('POST Route', () => {

    it('should respond with a status code 200 on good request', done => {
      chai.request(server)
      .post('/api/create')
      .send(group)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
//
// // eslint-disable-next-line
// const user = {
//   username: 'testy',
//   password: 'supersecret',
//   email: 'fake@fake.com',
// };
//
// // eslint-disable-next-line
// const test = {
//   title: 'Halo 10',
//   description: 'longest running video game of all time oh no',
//   game: 'Halo 5',
//   platform: 'Xbox',
//   skillLevel: 'Death',
//   dedication: 'casual',
//   groupSize: 5000,
//   startTime: Date.now(),
//   endTime: Date.now(),
// };
//
// // let userToken;
// // let id;
//
//
// describe('Group routes', function () {
//
//   // TODO: Travis gives a 500 error.
//   // before(done => {
//   //   chai.request(server)
//   //   .post('/api/signup')
//   //   .send(user)
//   //   .end((err, res) => {
//   //     userToken = res.text;
//   //     done();
//   //   });
//   // });
//

//
//
//   // TODO: Travis gives a 500 error.
//   // describe('POST /api/create', function (){
//   //   it('should create a new group', done => {
//   //     chai.request(server)
//   //     .post('/api/create')
//   //     .send(group)
//   //     .set({
//   //       Authorization: `Bearer ${userToken}`,
//   //     })
//   //     .end((err, res) => {
//   //       if(err) return done(err);
//   //       expect(res.status).to.equal(200);
//   //       done();
//   //     });
//   //     it('should send back object title', done => {
//   //       chai.request(server)
//   //       .post('/api/create')
//   //       .send(group)
//   //       .set({
//   //         Authorization: `Bearer ${userToken}`,
//   //       })
//   //       .end((err, res) => {
//   //         if(err) return done(err);
//   //         expect(res.body.title).to.equal('Halo 15');
//   //         done();
//   //       });
//   //     });
//   //     it('should send back object properties', done => {
//   //       chai.request(server)
//   //       .post('/api/create')
//   //       .send(group)
//   //       .set({
//   //         Authorization: `Bearer ${userToken}`,
//   //       })
//   //       .end((err, res) => {
//   //         if(err) return done(err);
//   //         expect(res.body.game).to.equal('Halo 5');
//   //         done();
//   //       });
//   //     });
//   //     it('should create a new group', done => {
//   //       chai.request(server)
//   //       .post('/api/create')
//   //       .send(group)
//   //       .set({
//   //         Authorization: `Bearer ${userToken}`,
//   //       })
//   //       .end((err, res) => {
//   //         if(err) return done(err);
//   //         id = res.body._id;
//   //         expect(id).to.exist;
//   //         done();
//   //       });
//   //     });
//   //   });
//   //   describe('Get /api/group/:_id', function () {
//   //     before(done => {
//   //       chai.request(server)
//   //       .post('/api/create')
//   //       .send(group)
//   //       .set({
//   //         Authorization: `Bearer ${userToken}`,
//   //       })
//   //       .end((err, res) => {
//   //         if(err) return done(err);
//   //         id = res.body._id;
//   //         done();
//   //       });
//   //     });
//   //     before(done => {
//   //       chai.request(server)
//   //       .get(`/api/group/${id}`)
//   //       .set({
//   //         Authorization: `Bearer ${userToken}`,
//   //       })
//   //       .end((err, res) => {
//   //         if(err) return done(err);
//   //         this.res = res;
//   //         done();
//   //       });
//   //     });
//   //     it('should return a status code of 200', done => {
//   //       expect(this.res.status).to.equal(200);
//   //       done();
//   //     });
//   //     it('should return an object', done => {
//   //       expect(this.res.body).to.be.an('object');
//   //       done();
//   //     });
//   //     it('should return an id', done => {
//   //       expect(this.res.body._id).to.exist;
//   //       done();
//   //     });
//   //     it('should return an host', done => {
//   //       expect(this.res.body.host).to.equal('testy');
//   //       done();
//   //     });
//   //   });
//   // });
//
//   // TODO: Travis gives a 500 error.
//   // describe('PUT /api/group/${id}/update', function (){
//   //   before(done => {
//   //     chai.request(server)
//   //     .post(`/api/create`)
//   //     .send(test)
//   //     .set({
//   //       Authorization: `Bearer ${userToken}`,
//   //     })
//   //     .end((err, res) => {
//   //       if(err) return done(err);
//   //       this.id = res.body._id;
//   //       done();
//   //     });
//   //   });
//   //   before(done => {
//   //     chai.request(server)
//   //     .put(`/api/group/${this.id}/update`)
//   //     .set({
//   //       Authorization: `Bearer ${userToken}`,
//   //     })
//   //     .send(group)
//   //     .end((err, res) => {
//   //       if(err) return done(err);
//   //       this.res = res;
//   //       done();
//   //     });
//   //   });
//   //   it('should keep it\'s id', done => {
//   //     expect(this.res.body._id).to.equal(this.id);
//   //     done();
//   //   });
//   //   it('should have a new title', done => {
//   //     expect(this.res.body.title).to.equal('Halo 10');
//   //     done();
//   //   });
//   //   it('should have a status code of 200', done => {
//   //     expect(this.res.status).to.equal(200);
//   //     done();
//   //   });
//   // });
//
//   // TODO: Travis gives a 500 error.
//   // describe('DELETE /api/group/:_id/delete', function () {
//   //   before(done => {
//   //     chai.request(server)
//   //     .post('/api/create')
//   //     .send(group)
//   //     .set({
//   //       Authorization: `Bearer ${userToken}`,
//   //     })
//   //     .end((err, res) => {
//   //       if(err) return done(err);
//   //       this.id = res.body._id;
//   //       done();
//   //     });
//   //   });
//   //   before(done => {
//   //     chai.request(server)
//   //     .delete(`/api/group/${this.id}/delete`)
//   //     .set({
//   //       Authorization: `Bearer ${userToken}`,
//   //     })
//   //     .end((err, res) => {
//   //       if(err) return done(err);
//   //       this.res = res;
//   //       done();
//   //     });
//   //   });
//   //   it('should return status code 204', done => {
//   //     expect(this.res.status).to.equal(204);
//   //     done();
//   //   });
//   //   it('should not have a content', done => {
//   //     expect(this.res.body).to.be.empty;
//   //     done();
//   //   });
//   // });
//
//   describe('GET /api/feed', function() {
//     // TODO: Travis gives a 500 error.
//     // before(done => {
//     //   chai.request(server)
//     //   .post('/api/create')
//     //   .send(group)
//     //   .set({
//     //     Authorization: `Bearer ${userToken}`,
//     //   })
//     //   .end(() => {});
//     //   chai.request(server)
//     //   .post('/api/create')
//     //   .send(test)
//     //   .set({
//     //     Authorization: `Bearer ${userToken}`,
//     //   })
//     //   .end(() => {
//     //     done();
//     //   });
//     // });
//
//     before(done => {
//       chai.request(server)
//       .get('/api/feed')
//       .end((err, res) => {
//         this.body = res.body;
//         done();
//       });
//     });
//
//     it('should be an array of groups', () => {
//       expect(this.body).to.be.an('array');
//     });
//
//     // TODO: Travis gives a 500 error.
//     // it('should have an oject representing an group post', () => {
//     //   expect(this.body[0]).to.be.an('object');
//     // });
//     // it('should have a first object with a title', () => {
//     //   expect(this.body[0].title).to.equal('Halo 15');
//     // });
//   });
// });
