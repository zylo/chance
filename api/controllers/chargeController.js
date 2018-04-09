'use strict';

const chargeService = require('../services/chargeService');

/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
function build(req, res) {
  chargeService.build(req.db, res);
}

module.exports = {
  build: build
};
