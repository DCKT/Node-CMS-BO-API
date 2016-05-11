'use strict';

const path = require('path');

module.exports = () => {
  global.rootRequire = name => require(path.normalize(`${__dirname}/../${name}`));
};
