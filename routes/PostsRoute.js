'use strict';

/**
* Posts Route
* path: /posts
******************** */

const express    = require('express');
const Controller = rootRequire('controllers/PostsController');
const router     = express.Router();

router.get('/', Controller.index.get);
router.post('/', Controller.index.post);

router.get('/:id', Controller.show.get);
router.put('/:id', Controller.show.put);
router.delete('/:id', Controller.show.destroy);

module.exports = router;
