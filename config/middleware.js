'use strict';

const path       = require('path');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const cors       = require('cors');

module.exports = function (app, express) {

  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());
};
