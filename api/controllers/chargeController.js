'use strict';

const chargeService = require('../services/chargeService');
const htmlHelper = require('../helpers/htmlGenerator');

/**
 * Swagger Controller method for GET /charges/build Endpoint
 * Accepts numCharges as integer in query
 * Default = 10
 */
function build(req, res) {
  const { numCharges } = req.query;
  chargeService.build(numCharges, (err, message) => {
    if (err) {
      res.status(400).json({ code: 400, message: err.message }).end();
    } else {
      res.status(200).json({code: 200, message: message }).end();
    }
  });
}

/**
 * Swagger Controller method for GET /charges/retrieve Endpoint
 */
// TODO: Pagination
function retrieve(req, res) {
  chargeService.retrieve((err, message, charges) => {
    if (err) {
      res.status(400).json({ code: 400, message: err.message }).end();
    } else {
        res.send(htmlHelper.generateHTML(charges)).end();
    }
  });
}

/**
 * TODO: Add swagger
 * Swagger Controller method for GET /charges/retrieve/{ID} Endpoint
 */
function retrieveChargeById(req, res) {
  const { chargeID } = req.params;
  console.log(chargeID);
  chargeService.retrieveChargeById(chargeID, (err, message, charge) => {
    if (err) {
      res.status(400).json({ code: 400, message: err.message }).end();
    } else {
        res.send(htmlHelper.generateHTML(charge)).end();
    }
  });
}

module.exports = {
  build: build,
  retrieve: retrieve
};
