# Looking To Game Backend

[![Build Status](https://travis-ci.org/Looking-To-Game/ltg-be.svg?branch=dev)](https://travis-ci.org/Looking-To-Game/ltg-be)

[![Coverage Status](https://coveralls.io/repos/github/Looking-To-Game/ltg-be/badge.svg?branch=master)](https://coveralls.io/github/Looking-To-Game/ltg-be?branch=master)

## Version
0.4.0

## Description
Looking to game is a service that helps people form groups to play games.

## Application
Looking to game is a full stack JavaScript application (app) with a front end and back end. Both the front and back end are necessary to make the application work. This repository (repo) is the back end.

### Front End
The front end can be found at the following GitHub location:

https://github.com/Looking-To-Game/ltg-fe

### Deployed Application
The most stable version of the backend is called production. The production backend has been deployed to Heroku at the following location:

https://ltg-be-production.herokuapp.com

For use with the production API, replace http://localhost:3000 with the address or URL above.

Example:

https://ltg-be-production.herokuapp.com/api/signup

### Back End

First follow the steps in the installation section below.
Open [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)).
Enter one of the following commands:
`npm run start`
`npm run start-debug`
`npm run debug`

These commands can also be found in the scripts section of package.json.
```
"start": "node server.js",
"start-debug": "DEBUG='ltg*' npm start",
```

### Database
In second bash window run `mongo`
[Mongo Shell Methods](https://docs.mongodb.com/manual/reference/method/)
1. Enter `show dbs`
2. Enter `use ltg`
3. Enter `show collections`
4. Enter `db.users.find()`
5. Enter `db.users.drop()`

### Model

User Schema
```
const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type:String, required:true},
  findhash: {type: String, unique: true},
  steam: {type: String, default:null},
  bn: {type: String, default:null},
  xbl: {type: String, default:null},
  psn: {type: String, default:null},
  lol: {type: String, default:null},
});
```
Group Schema
```
const groupSchema = Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  host: {type: String, required: true},
  game: {type: String, required: true},
  platform: {type: String, required: true},
  skillLevel: {type: String},
  dedication: {type: String},
  groupSize: {type: Number},
  startTime: {type: Date, default: Date.now},
  endTime: {type: Date},
});
```

## API
In a web browser enter the address or URL:
http://localhost:3000
Add to the address above with the API routes below.
Example:
http://localhost:3000/api/signup

*Auth Routes*

### POST /api/signup
* Use this route to sign-up for a user account.
* Headers required:
  * `Content-Type: application/json`
* Post:
  * Required: object with username, email, and password.
  ```
  {
    "username":"test1",
    "email":"test1@test.com",
    "password":"test1"
  }
  ```
* Response:
  * Should return a 200 response and token.

### GET /api/signin
* Use this route to sign-in with an existing user account.
* Headers required:
  * Authorization: Basic Auth `username: password`
  * `Content-Type: application/json`
* Response:
  * Should return a 200 response and new token.

*User Routes*

### GET /api/user
* Use this route to get information for an existing user account.
* Headers required:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* Response:
  ```
  {
    "_id": "594d3d8edeb6ab00111e7ecd",
    "password": null,
    "username": "test1",
    "email": "test1@test.com",
    "__v": null,
    "findhash": null,
    "lol": null,
    "psn": null,
    "xbl": null,
    "bn": null,
    "steam": null
  }
  ```
  * Should return a 200 response and object properties.

### PUT /api/user
* Use this route to update existing user account information.
* Headers required:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* Put:
  ```
  {
    "_id": "594d3d8edeb6ab00111e7ecd",
    "password": null,
    "username": "test2",
    "email": "test2@test.com",
    "__v": 0,
    "findhash": null,
    "lol": null,
    "psn": null,
    "xbl": null,
    "bn": null,
    "steam": null
  }
  ```
* Response:
  * Object with id, username, email, and game accounts.
  * Should return a 200 response and object properties.

*Group Routes*

### POST /api/create
* Use this route to create a new looking for group post.
* Headers required:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* Post:
  * Required: title, description, host, game, and platform.
  ```
  {
    "title": "game group",
    "description": "looking to raid",
    "host":"player one",
    "game":"destiny",
    "platform":"playstation"
  }
  ```
* Response:
  * Object with title, description, host, game, platform, id, and start time. `"_id": "594d4b73aa52590dc2f7efa4"`
  * Should return a 200 response and object properties.

### GET /api/group/:id
* Use this route to get an existing group post.
* URL example: `/api/group/594d4b73aa52590dc2f7efa4`
* Headers:
  * `Content-Type: application/json`
* Response:
  * Should return a 200 response and object properties.
  ```
  {
    "_id": "594d4b73aa52590dc2f7efa4",
    "title": "game group",
    "description": "looking to raid",
    "host": "test2",
    "game": "destiny",
    "platform": "playstation",
    "__v": 0,
    "startTime": "2017-06-23T17:10:11.270Z"
  }
  ```

### GET /api/feed
* Use this route to get all group posts.
* Headers:
  * `Content-Type: application/json`
* Response:
  * Should return a 200 response and an array of objects.
  ```
  [
    {
        "_id": "594d4b73aa52590dc2f7efa4",
        "title": "game group",
        "description": "looking to raid",
        "host": "test2",
        "game": "destiny",
        "platform": "playstation",
        "__v": 0,
        "startTime": "2017-06-23T17:10:11.270Z"
    },
    {
        "_id": "594d51f5aa52590dc2f7efa5",
        "title": "game group2",
        "description": "looking to raid2",
        "host": "test2",
        "game": "destiny",
        "platform": "playstation",
        "__v": 0,
        "startTime": "2017-06-23T17:37:57.053Z"
    }
  ]
  ```

### PUT /api/group/:id/update
* Use this route to update existing group post.
* URL example: `/api/group/594d4b73aa52590dc2f7efa4/update`
* Headers:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* Response:
  * Should return a 200 response and object properties.
  ```
  {
    "title": "game group3",
    "description": "looking to raid3",
    "game": "destiny",
    "platform": "playstation",
    "groupSize": "3"
  }
  ```

### DELETE /api/group/:id/delete
* Use this route to delete an existing group post.
* URL example: `/api/group/594d51f5aa52590dc2f7efa5/delete`
* Headers:
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* Response:
  * Should return only a 204 response.
  * `DELETE /api/group/594d51f5aa52590dc2f7efa5/delete 204`
  * Use GET /api/feed to see deleted group post.

## Installation

### GitHub
Please visit the following pages for how to install your project locally.
* [Cloning A Repository](https://help.github.com/articles/cloning-a-repository/)
* [Fork A Repo](https://help.github.com/articles/fork-a-repo/)
* [Forking](https://guides.github.com/activities/forking/)

### MongoDB
* [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
* [The MongoDB 3.4 Manual](https://docs.mongodb.com/manual/#getting-started)
```
db install
brew update
brew install mongodb
mongod --dbpath ./db
```

### NPM Packages
* [NPM Docs](https://docs.npmjs.com)
* [NPM package.json](https://docs.npmjs.com/files/package.json)

### Installing Packages
* [NPM Install](https://docs.npmjs.com/cli/install)
`npm i` or `npm install`

As a result, the following packages are installed:
```
"dependencies": {
  "bcrypt": "^1.0.2",
  "bluebird": "^3.5.0",
  "body-parser": "^1.17.2",
  "cors": "^2.8.3",
  "crypto": "0.0.3",
  "debug": "^2.6.8",
  "dotenv": "^4.0.0",
  "express": "^4.15.3",
  "http-errors": "^1.6.1",
  "jsonwebtoken": "^7.4.1",
  "mongoose": "^4.10.7",
  "morgan": "^1.8.2",
  "superagent": "^3.5.2"
},
"devDependencies": {
  "chai": "^4.0.2",
  "chai-http": "^3.0.0",
  "coveralls": "^2.13.1",
  "istanbul": "^0.4.5",
  "mocha": "^3.4.2",
  "mocha-lcov-reporter": "^1.3.0"
}
```

## Tests

### Running Tests
In [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) enter the command:
`npm run test`

These commands can also be found in the scripts section of package.json.
```
"test": "./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha",
"cover": "istanbul cover _mocha",
"test-debug": "DEBUG='ltg*' ./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha"
```

## Resources
* [Postman](https://www.getpostman.com/docs/)

## License
This project is licensed under the MIT License.

## Acknowledgments
* Code Fellows
* Scott Schmidt, Instructor
* Cayla Zabel, Teaching Assistant
* Devon Hackley, Teaching Assistant
* Thomas Martinez, Teaching Assistant
* JR Iriarte, Teaching Assistant
