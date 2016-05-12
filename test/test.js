'use strict';
const assert     = require('chai').assert;
const superagent = require('superagent');
const URI        = `http://localhost:8080`;

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
          assert.notEqual(res.body.post, undefined, 'should return a post object');
          assert.equal(res.statusCode, 201, 'Status code should be equal to 201');
          done();
        });
    });
  });
});
