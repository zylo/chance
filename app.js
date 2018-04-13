'use strict';

const logger = require('./api/helpers/logger');
const middleware = require('./middleware');

const swaggerParser = require('swagger-parser');
const express = require('express');

const app = express();
const port = '4000';
process.env.NODE_ENV = 'development';

middleware.beforeSwagger(app);

swaggerParser.validate('./api/swagger/swagger.yaml', (err, api) => {
  if (err) throw err;

  middleware.afterSwagger(app, api);

  app.listen(port);
  logger.info(`chance api has started on port: ${port}`);
});

module.exports = app;
