const knex = require('knex');
const { defaultConnection } = require('../../config/config');
const logger = require('../helpers/logger');

class ChargeDAO {
  constructor() {
    this.db = knex(defaultConnection);
    this.chargesSaved = 0;
    this.chargesFailed = 0;
  }

  save(charges) {
    return this.db('charges')
      .insert(charges)
      .then(() => { this.chargesSaved += charges.length; })
      .catch((error) => {
        logger.error(error);
        this.chargesFailed += charges.length;
      });
  }

  findGroupedByName() {
    return this.db('charges')
      .select({ name: 'name', type: 'type' })
      .count('id as total_charges')
      .sum('amount as total_cost')
      .groupBy(['name', 'type']);
  }
}

module.exports = { ChargeDAO: ChargeDAO };
