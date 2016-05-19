'use strict';
require('../utils/rootRequire')();

const Post = rootRequire('models/Post');

for (let i = 0; i < 20; i++) {
  Post.create({
    title: `Post title ${i}`,
    description: 'Holy mother Dummy description ',
    content: 'Super description of the dead MAIS OUI CEST CLAIR',
  });
}
