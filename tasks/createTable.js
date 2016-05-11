'use strict';
require('../utils/rootRequire')();

const Post = rootRequire('models/Post');

Post.sync({ force: true }).then(() => {
  console.log('Post table created !\n');
});