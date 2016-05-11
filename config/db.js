'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('cms_node', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: './database.sqlite'
});

module.exports = sequelize;