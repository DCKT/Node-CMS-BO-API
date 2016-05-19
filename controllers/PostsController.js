'use strict';

const Post = rootRequire('models/Post');

const index = {
  get(req, res) {
    const postPerPage = 5;
    const currentPage = Number.isInteger(req.query.page) ? req.query.page : undefined;

    Post
      .findAll({
        offset: currentPage ? (currentPage - 1) * postPerPage : 0,
        limit: postPerPage,
      })
      .then(posts => {
        res.send({ posts, page: currentPage || 1 });
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

const show = {
  get(req, res) {
    const id = req.params.id;

    Post
      .findById(id)
      .then(post => {
        if (post) {
          res.status(200).send({ post });
        } else {
          res.status(404).send({ post: null, error: `Post ${id} not found` });
        }
      });
  },

  put(req, res) {
    const id         = req.params.id;
    const postParams = req.body.post;

    Post
      .findById(id)
      .then(post => post.update(postParams))
      .then(data => {
        res.status(200).send({ post: data.dataValues });
      })
      .catch(err => {
        res.status(400).send({ errors: err.errors });
      });
  },

  destroy(req, res) {
    const id = req.params.id;

    Post
      .findById(id)
      .then(post => {
        if (post) {
          post
            .destroy()
            .then(() => {
              res.status(200).send({ message: `Post ${id} deleted` });
            })
            .catch(err => {
              res.status(400).send({ errors: err.errors });
            });

        } else {
          res.status(404).send({ errors: { message: `Post ${id} not found` } });
        }
      });
  },
};

module.exports = {
  index,
  show,
};
