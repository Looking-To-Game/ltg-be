'use strict';

// LOCAL
// Works locally, but not for production.

/*
These routes work with local:
POST /api/signup 200 109.810 ms - 205
GET /api/signin 200 89.049 ms - 205
GET /api/user/ 200 7.957 ms - 179
PUT /api/user/ 200 12.751 ms - 176
PUT /api/user/ 200 4.827 ms - 181

Tests:
22 passing (581ms)
*/

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();

require('dotenv').load();

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
app.use('/api', require('./router/group-routes')(router));
app.use('/api', require('./router/user-routes')(router));

const server = module.exports = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

server.isRunning = true;

// DEPLOYMENT

// Npm modules
// const cors = require('cors');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const express = require('express');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
// const debug = require('debug')('lfg:server');

// App modules
// const authRoutes = ('/api', require('./router/auth-routes'));
// const groupRoutes = ('/api', require('./router/group-routes'));
// const userRoutes = ('/api', require('./router/user-routes'));
// const errorMiddleware = (require('./lib/error-middleware'));
// const bodyParser = require('body-parser').json();

// Load env vars
// dotenv.load();

// Setup mongoose
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URI);

// Module constants
// const PORT = process.env.PORT;
// const app = express();

// app middleware
// app.use(cors());
// let production = process.env.NODE_ENV === 'production';
// let morganFormat = production ? 'common' : 'dev';
// app.use(morgan(morganFormat));

// app routes
// app.use(authRoutes);
// app.use(groupRoutes);
// app.use(userRoutes);
// app.use(errorMiddleware);
// app.use(bodyParser);

// start server
// const server = module.exports = app.listen(PORT, () => {
//   debug(`server up on ${PORT}`);
// });

// server.isRunning = true;
