'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
// const debug = require('debug')('lfg:server');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser);
app.use(require('./lib/error-middleware'));

app.use('/api', require('./router/auth-routes')(router));
app.use('/api', require('./router/user-routes')(router));

const server = module.exports = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

server.isRunning = true;
