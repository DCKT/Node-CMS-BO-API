'use strict';
const assert     = require('chai').assert;
const superagent = require('superagent');
const URI        = `http://localhost:8080`;
let postTmp      = null;

describe('/posts', () => {
  describe('GET /', () => {
    it('should return all the posts', done => {
      superagent
        .get(`${URI}/posts`)
        .end((req, res) => {
          const posts = res.body.posts;
          assert.notEqual(posts, undefined, `posts shouldn't be undefined`);
          assert.equal(res.status, 200, 'Status code should be equal to 200');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should throw 400 error when bad parameters', done => {
      const badInformations = {};

      superagent
        .post(`${URI}/posts`)
        .send({ badInformations })
        .end((req, res) => {
          assert.equal(res.statusCode, 400, 'Status code should be equal to 400');
          done();
        });
    });

    it('should throw errors when attributes missing', done => {
      superagent
        .post(`${URI}/posts`)
        .end((req, res) => {
          const errors = res.body.errors;
          assert.notEqual(errors, undefined, 'response should contains errors array');
          done();
        });
    });

    it('should create a post', done => {
      const post = {
        title: 'Hello world',
        description: 'Hello world description de 50 caractères pas facile à tester',
        content: 'Hello world content de 50 caractères pas facile à tester',
      };

      superagent
        .post(`${URI}/posts`)
        .send({ post })
        .end((req, res) => {
          postTmp = res.body.post;
          assert.notEqual(res.body.post, undefined, 'should return a post object');
          assert.equal(res.statusCode, 201, 'Status code should be equal to 201');
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('should return a 404 when id not exist', done => {
      superagent
        .get(`${URI}/posts/9999`)
        .end((req, res) => {
          const post = res.body.post;
          assert.equal(post, null, `post should be null`);
          assert.equal(res.status, 404, 'Status code should be equal to 404');
          done();
        });
    });

    it('should return a post', done => {
      superagent
        .get(`${URI}/posts/${postTmp.id}`)
        .end((req, res) => {
          const post = res.body.post;
          assert.notEqual(post, undefined, `post shouldn't be undefined`);
          assert.equal(res.status, 200, 'Status code should be equal to 200');
          done();
        });
    });
  });


  describe('PUT /:id', () => {

    it('should throw 400 error when bad parameters', done => {
      const badInformations = {
        title: 'Salut',
      };

      superagent
        .put(`${URI}/posts/${postTmp.id}`)
        .send({ badInformations })
        .end((req, res) => {
          assert.equal(res.statusCode, 400, 'Status code should be equal to 400');
          done();
        });
    });

    it('should update a post', done => {
      const post = {
        title: 'Salut',
      };

      superagent
        .put(`${URI}/posts/${postTmp.id}`)
        .send({ post })
        .end((req, res) => {
          assert.notEqual(res.body.post, undefined, 'should return a post object');
          assert.equal(res.statusCode, 200, 'Status code should be equal to 200');
          assert.equal(res.body.post.title, 'Salut', 'Post title should have changed');
          done();
        });
    });
  });

  describe('DELETE /:id', () => {
    it('should throw 404 error when id not found', done => {
      superagent
        .delete(`${URI}/posts/99999`)
        .end((req, res) => {
          assert.equal(res.statusCode, 404, 'Status code should be equal to 404');
          done();
        });
    });

    it('should delete the post', done => {
      superagent
        .delete(`${URI}/posts/${postTmp.id}`)
        .end((req, res) => {
          assert.notEqual(res.body.message, undefined, 'Response body should contain confirmation message');
          assert.equal(res.statusCode, 200, 'Status code should be equal to 200');
          done();
        });
    });
  });
});
