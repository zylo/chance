const knex = require('knex');
const knexfile = require('../../knexfile');
const logger = require('../helpers/logger');

class ChargeDAO {
  constructor() {
    this.db = knex(knexfile[process.env.NODE_ENV]);
    this.chargesSaved = 0;
    this.chargesFailed = 0;
  }

  save(charges) {
    const toSave = Array.isArray(charges) ? charges : Array(charges);
    return this.db
      .batchInsert('charges', toSave)
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
