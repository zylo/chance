'use strict';

const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-tools/middleware/swagger-ui');
const swaggerMetadata = require('swagger-tools/middleware/swagger-metadata');
const swaggerRouter = require('swagger-tools/middleware/swagger-router');
const swaggerValidator = require('swagger-tools/middleware/swagger-validator');

const beforeSwagger = function (app) {
  app.use(helmet());

  app.use(bodyParser.json({
    type: 'application/json'
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors({ maxAge: 600 }));
};

const afterSwagger = function (app, swagger) {
  const options = {
    controllers: './api/controllers',
    useStubs: (process.env.NODE_ENV === 'development') // Conditionally turn on stubs (mock mode)
  };

  // Puts the `swagger` on req
  app.use(swaggerMetadata(swagger));
  app.use(swaggerValidator());

  app.use(swaggerRouter(options));
  if (process.env.NODE_ENV === 'development') app.use(swaggerUi(swagger));
};

module.exports = {
  beforeSwagger: beforeSwagger,
  afterSwagger: afterSwagger
};
