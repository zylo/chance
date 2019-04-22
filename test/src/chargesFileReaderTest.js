'use strict';

const assert = require('assert');
const { ChargesFileReader } = require('../../src/ChargesFileReader');

const TEST_FILE_PATH = './test/charges.test.json';

describe('chargesFileReader', () => {
  it('emits a "data" event for every batch of charges read', (done) => {
    const batchSize = 5;

    let actualDataEvents = 0;
    let actualChargeCount = 0;

    const chargesReader = new ChargesFileReader(TEST_FILE_PATH);

    chargesReader.read(batchSize).on('data', (charges) => {
      actualDataEvents++;
      actualChargeCount += charges.length;

      assert.strictEqual(batchSize, charges.length);
    }).on('end', () => {
      assert.strictEqual(4, actualDataEvents);
      assert.strictEqual(20, actualChargeCount);
      done();
    });
  });

  it('uses the default batch size if a non-positive batch size is provided', (done) => {
    let actualDataEvents = 0;
    let actualChargeCount = 0;

    const chargesReader = new ChargesFileReader(TEST_FILE_PATH);

    chargesReader.read(-1).on('data', (charges) => {
      actualDataEvents++;
      actualChargeCount += charges.length;

      assert.strictEqual(20, charges.length);
    }).on('end', () => {
      assert.strictEqual(1, actualDataEvents);
      assert.strictEqual(20, actualChargeCount);
      done();
    });
  });
});
