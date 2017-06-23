'use strict';

const expect = require('chai').expect;
const middleWear = require('../lib/error-middleware.js');
// const createError = require('http-errors');

let resPonse = function() {
  let res = {};
  res.status = function (num){
    this.statusCode = num;
    return this;
  };
  res.send = function (data){
    this.text = data.toString();
    return this;
  };
  res.json = function (data){
    this.body = data;
    return this;
  };
  return res;
};

describe('Error Middlewear', function(){
  let res;
  before(() => res = resPonse());
  it('should return a status code 500', done => {
    let err = new Error('Generic Error');
    middleWear(err, {}, res, () => {
      expect(res.statusCode).to.equal(500);
      expect(res.text).to.equal('InternalServerError');
      done();
    });
  });
  describe('Bad Request respond with 400', function(){
    let res;
    before(() => res = resPonse());
    it('should return a status code of 400', done => {
      let err = new Error('Bad Request');
      err.name = 'ValidationError';
      middleWear(err, {}, res, () => {
        expect(res.statusCode).to.equal(400);
        expect(res.text).to.equal('Bad Request');
        done();
      });
    });
  });
});
