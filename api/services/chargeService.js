'use strict';

const _ = require('lodash');
const fs = require('fs');

function createCharge() {
  const chargeObj = {
    amount: _.sample([100, 250, 500, 750, 1000]),
    date: '1/1/2018',
    name: 'Salesforce CRM',
    description: 'Annual renewal for company licenses',
    type: 'AP'
  };

  return chargeObj;
}

function build(numCharges, cb) {
  const charges = [];
  for (let i = 0; i < numCharges; i++) {
    charges.push(createCharge());
  }

  try {
    const chargeFile = `${__dirname}/../../temp/charges.json`;
    fs.writeFileSync(chargeFile, JSON.stringify(charges));
    cb(null, 'Successfully created charge file.');
  } catch (e) {
    cb('Failed to created charge file.');
  }
}

module.exports = {
  build: build,
  createCharge: createCharge
};
