'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
const debug = require('debug')('ltg:server');

require('dotenv').load();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const router = express.Router();

app.use(cors());
let production = process.env.NODE_ENV === 'production';
let morganFormat = production ? 'common' : 'dev';
app.use(morgan(morganFormat));

app.use(bodyParser);
app.use(require('./lib/error-middleware'));

app.use('/api', require('./router/auth-routes')(router));
app.use('/api', require('./router/group-routes')(router));
app.use('/api', require('./router/user-routes')(router));

const server = module.exports = app.listen(PORT , () => {
  debug(`server up on ${PORT}`);
});

server.isRunning = true;
