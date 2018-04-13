'use strict';

const _ = require('lodash');

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

function build(db, cb) {
  cb(null, 'success');
}

module.exports = {
  build: build,
  createCharge: createCharge
};
