'use strict';

const Post = rootRequire('models/Post');

const index = {
  get(req, res) {
    Post
      .findAll()
      .then(posts => {
        res.send({ posts });
      });
  },

  post(req, res) {
    const post = req.body.post;

    Post
      .create(post)
      .then(data => {
        res.status(201).send({ post: data.dataValues });
      })
      .catch(err => {
        res.status(400).send({ errors: err.errors });
      });
  },
};

module.exports = {
  index,
};
