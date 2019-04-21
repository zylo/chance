const knex = require('knex');
const { defaultConnection } = require('../../config/config');
const logger = require('./logger');

class ChargeImporter {
  constructor() {
    this.db = knex(defaultConnection);
    this.chargesSaved = 0;
    this.chargesFailed = 0;
  }

  async saveCharge(charges) {
    return this.db('charges')
      .insert(charges)
      .then(() => { this.chargesSaved += charges.length; })
      .catch((error) => {
        logger.error(error);
        this.chargesFailed += charges.length;
      });
  }
}

module.exports = { ChargeImporter: ChargeImporter };
