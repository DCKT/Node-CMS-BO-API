'use strict';

const Sequelize = require('sequelize');
const sequelize = rootRequire('config/db');

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 5,
      notEmpty: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 50,
      notEmpty: true,
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 50,
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Post;