'use strict';

const chargeService = require('../services/chargeService');

/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
function build(req, res) {
  const chargeCount = (req.query && req.query.count) || 10;

  chargeService.build(chargeCount, (err, message) => {
    if (err) {
      res.status(400).json({ code: 400, message: err.message }).end();
    } else {
      res.status(200).json({ code: 200, message: message }).end();
    }
  });
}

module.exports = {
  build: build
};
