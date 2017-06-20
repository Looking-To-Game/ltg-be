'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  host: {type: String, required: true, ref: 'user'},
  game: {type: String, required: true},
  platform: {type: String, required: true},
  skillLevel: {type: String},
  dedication: {type: String},
  groupSize: {type: Number},
  startTime: {type: Date, default: Date.now},
  endTime: {type: Date},
});

module.exports = mongoose.model('group', groupSchema);
