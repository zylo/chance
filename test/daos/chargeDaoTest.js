'use strict';

const assert = require('assert');
const knex = require('knex');
const knexfile = require('../../knexfile');

const { ChargeDAO } = require('../../api/daos/chargeDao');

const db = knex(knexfile.test);

describe('chargeDao', () => {
  beforeEach((done) => {
    db.raw('DELETE FROM charges').catch(done).then(() => done());
  });

  afterEach((done) => {
    db.raw('DELETE FROM charges').catch(done).then(() => done());
  });

  describe('save', () => {
    it('imports a single charge', (done) => {
      const dao = new ChargeDAO();
      const charge = {
        name: 'Test Thing',
        type: 'AP',
        amount: 500.00,
        date: '2019-02-06T15:14:07+00:00'
      };

      dao
        .save(charge)
        .then(() => db('charges').first())
        .then((row) => {
          assert.strictEqual(charge.name, row.name);
          assert.strictEqual(charge.type, row.type);
          assert.strictEqual(charge.amount, Number(row.amount));
          assert.strictEqual(Date.parse(charge.date), Date.parse(row.date));
          assert(row.id);
        })
        .catch(done)
        .finally(done);
    });

    it('imports multiple charges', (done) => {
      const dao = new ChargeDAO();
      const charges = [
        {
          name: 'Test Charge 1',
          type: 'AP',
          amount: 500.00,
          date: '2019-02-06T15:14:07+00:00'
        },
        {
          name: 'Test Charge 2',
          type: 'AP',
          amount: 575.00,
          date: '2019-02-06T15:14:08+00:00'
        }
      ];

      dao.save(charges)
        .then(() => db('charges').select())
        .then((rows) => {
          assert.strictEqual(2, rows.length, `${rows.length} rows found.  Should have only been 2`);
        })
        .catch(done)
        .finally(done);
    });
  });

  describe('groupByName', () => {
    it('aggregates data by name and type', (done) => {
      const dao = new ChargeDAO();
      const charges = [
        {
          name: 'Test Charge 1',
          type: 'AP',
          amount: 500.00,
          date: '2019-02-06T15:14:07+00:00'
        },
        {
          name: 'Test Charge 1',
          type: 'AP',
          amount: 575.00,
          date: '2019-02-06T15:14:08+00:00'
        },
        {
          name: 'Test Charge 2',
          type: 'AP',
          amount: 700.00,
          date: '2019-02-06T15:14:08+00:00'
        }
      ];

      dao.save(charges)
        .then(() => dao.findGroupedByName())
        .then((data) => {
          assert.strictEqual(2, data.length);

          const charge1 = data.find(row => row.name === 'Test Charge 1'); // eslint-disable-line max-nested-callbacks
          const charge2 = data.find(row => row.name === 'Test Charge 2'); // eslint-disable-line max-nested-callbacks

          assert.strictEqual('AP', charge1.type);
          assert.strictEqual(1075, Number(charge1.total_cost));
          assert.strictEqual(2, Number(charge1.total_charges));

          assert.strictEqual('AP', charge2.type);
          assert.strictEqual(700, Number(charge2.total_cost));
          assert.strictEqual(1, Number(charge2.total_charges));
        })
        .catch(done)
        .finally(done);
    });
  });
});
