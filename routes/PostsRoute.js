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

module.exports = router;
