'use strict';

const chargeService = require('../services/chargeService');

/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
function buildCharges(req, res) {
  chargeService.buildCharges(req.db, res);
}

module.exports = {
  buildCharges: buildCharges
};
