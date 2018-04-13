'use strict';

const assert = require('assert');
const chargeService = require('../../api/services/chargeService');
const fs = require('fs');

describe('chargeService', () => {
  describe('createCharge', () => {
    it('should validate that a charge is built', () => {
      chargeService.createCharge('Salesforce CRM', (charge) => {
        assert.equal(charge.name, 'Salesforce CRM');
        assert.equal(!charge.amount, 0);
        assert.equal(charge.type, 'AP');
      });
    });
  });

  describe('build', () => {
    it('should fail to build if directory does not exist', () => {
      chargeService.build(10, (err) => {
        assert.equal(err, 'Error: Failed to created charge file.');
      });
    });

    it('should build charge file with 10 records', () => {
      if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
      }

      chargeService.build(10, (err, message) => {
        assert.equal(err, null);
        assert.equal(message, 'Successfully created charge file.');

        const chargeFile = `${__dirname}/../../temp/charges.json`;
        const charges = fs.readFileSync(chargeFile);
        assert.equal(JSON.parse(charges).length, 10);
      });
    });
  });
});
