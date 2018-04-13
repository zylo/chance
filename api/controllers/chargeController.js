'use strict';

const chargeService = require('../services/chargeService');

/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
function build(req, res) {
  chargeService.build(10, (err, message) => {
    const statusCode = err ? 500 : 200;

    if (statusCode === 500) {
      res.status(statusCode).json(message).end();
    } else {
      res.status(statusCode).json({ code: statusCode, message: message }).end();
    }
  });
}

module.exports = {
  build: build
};
