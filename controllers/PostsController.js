'use strict';

const Post = rootRequire('models/Post');

const index = {
  get(req, res) {
    Post
      .findAll()
      .then(posts => {
        res.send(posts);
      })  
  },
  
  post(req, res) {
    const post = req.body.post;
    console.log(req.body);

    Post
      .create(post)
      .then(() => {
        res.status(201).end();
      })
      .catch(err => {
        res.status(400).send(err.errors);
      }); 
  },
};

module.exports = {
  index,
};
