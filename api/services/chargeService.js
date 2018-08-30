'use strict';

const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'zylo_chance',
  password: process.env.POSTGRES_PASSWORD || 'password'
});

function createCharge(appName) {
  const chargeObj = {
    amount: _.sample([100, 250, 500, 750, 1000]),
    date: moment().subtract(_.random(0, 180), 'days').format(),
    name: appName,
    description: 'Annual renewal for company licenses.',
    type: 'AP'
  };

  return chargeObj;
}

function build(numCharges = 10, cb) {
  const apps = ['Salesforce CRM', 'Adobe Creative Cloud', 'JIRA', 'GitHub', 'Sentry', 'AWS', 'Slack'];
  const charges = [];
  for (let i = 0; i < numCharges; i++) {
    const appName = _.sample(apps);
    charges.push(createCharge(appName));
  }

  try {
    const chargeFile = `${__dirname}/../../temp/charges.json`;
    fs.writeFileSync(chargeFile, JSON.stringify(charges));
    cb(null, 'Successfully created charge file.');
  } catch (e) {
    cb(new Error('Failed to created charge file.'));
  }
}

/**
 * Retrieves all charges
 *
 * @param {Function < any (callback) >} cb
 */
function retrieve(cb) {
  const query = {
    text: 'SELECT * FROM charges'
  };

  pool.query(query)
    .then((queryResult) => {
      cb(null, 'Successfully retrieved charge data', queryResult.rows);
    })
    .catch((err) => {
      cb(new Error(`Failed to load charge data, ${err}`));
    });
}

/**
 * Retrieves charge associated with { id }
 *
 * @param {uuid | string} chargeID
 * @param {Function < any (callback) >} cb
 */
function retrieveChargeById(chargeID, cb) {
  const query = {
    text: 'SELECT * FROM charges WHERE id = $1',
    values: [chargeID]
  };

  pool.query(query)
    .then((queryResult) => {
      cb(null, 'Successfully retrieved charge data', queryResult.rows);
    })
    .catch((err) => {
      cb(new Error(`Failed to load charge data, ${err}`));
    });
}


module.exports = {
  build: build,
  createCharge: createCharge,
  retrieve: retrieve,
  retrieveChargeById: retrieveChargeById
};
