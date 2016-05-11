'use strict';

require('./utils/rootRequire')();
const express = require('express');
const app     = express();
const router  = require('./Router');

/**
* MIDDLEWARE
********************* */
require('./config/middleware')(app, express);

/**
* ROUTES
********************* */
router.forEach(route => {
  if (route.middleware) {
    app.use(route.path, route.middleware, route.handler);
  } else {
    app.use(route.path, route.handler);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on ${process.env.PORT || 8080}`);
});
