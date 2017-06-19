'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-middleware.js');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/lfg-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);
app.use('/api', require('./router/auth-routes.js')(router));

app.listen(PORT, () => console.log(`Hosted on localhost:${PORT}`));
