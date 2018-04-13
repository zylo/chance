'use strict';

const assert = require('assert');
const chargeService = require('../../api/services/chargeService');

describe('chargeService', () => {
  describe('search', () => {
    it('should validate that a charge is built', () => {
      chargeService.createCharge((charge) => {
        assert.equal(charge.name, 'Salesforce CRM');
        assert.equal(!charge.amount, 0);
        assert.equal(charge.type, 'AP');
      });
    });
  });
});
