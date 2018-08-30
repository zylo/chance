'use strict';

const assert = require('assert');
const importScript = require('../../bin/import');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

describe('import-script', () => {
  const chargeFileName = 'temp/charges.json';
  describe('loadImportFile', () => {
    // TODO: fail here without parameter and command line  bug
    // it('should fail if filename is not present', () => {
    //   importScript.loadImportFile(null, (err) => {
    //     assert.equal(err, 'Error: Failed to load charge file.');
    //   });
    // });

    it('should load a charge file with 10 records', () => {
      importScript.loadImportFile(chargeFileName, (err, chargeData) => {
        assert.equal(err, null);
        assert.equal(chargeData.length, 10);
      });
    });
  });

  describe('formatData', () => {
    it('should append a UUID to each charge', () => {
      const chargeData = JSON.parse(fs.readFileSync(chargeFileName));
      importScript.formatData(chargeData, (updatedArray) => {
        updatedArray.map(charge => assert.equal(typeof charge.id, 'string'));
      });
    });
  });

  describe('generateQueryString', () => {
    it('should spread charge data into query values', () => {
      const chargeData = JSON.parse(fs.readFileSync(chargeFileName));
      const formattedData = chargeData.map((charge) => {
        const updatedCharge = charge;
        updatedCharge.id = uuidv4(); // appending a UUID to the data
        return Object.values(updatedCharge); // return values as (values, ...) to be consumed by psql
      });
      importScript.generateQueryString(formattedData, (outputQueryString) => {
        assert.equal(typeof outputQueryString, 'string');
        const testQueryString = 'INSERT INTO charges(amount,date,name,description,type,id) ' +
          'Values ("250", "2018-03-02T23:04:30+00:00", "AWS", "Annual renewal for company licenses.", "AP", ' +
          '"07b4d500-9563-4012-a2f3-65d3678bc56a"), ("750", "2018-03-25T23:04:30+00:00", "Adobe Creative Cloud", ' +
          '"Annual renewal for company licenses.", "AP", "61cba205-86d8-4358-81f5-670ad1e8bf0c"), ' +
          '("250", "2018-05-12T23:04:30+00:00", "Slack", "Annual renewal for company licenses.", "AP", ' +
          '"fee5a205-1a7e-476f-97ea-59f1eec7bf3a"), ("250", "2018-08-09T23:04:30+00:00", "Slack", ' +
          '"Annual renewal for company licenses.", "AP", "e29577ff-5d2b-4724-a216-1755a0eb1d9d"), ' +
          '("750", "2018-05-03T23:04:30+00:00", "Slack", "Annual renewal for company licenses.", ' +
          '"AP", "3919cc8b-2b63-4430-9dee-e61b0d899ddb"), ("1000", "2018-04-22T23:04:30+00:00", ' +
          '"Salesforce CRM", "Annual renewal for company licenses.", "AP", "0a9fea4f-d93d-44e2-9d73-017e12b1d505"), ' +
          '("1000", "2018-03-12T23:04:30+00:00", "GitHub", "Annual renewal for company licenses.", "AP", ' +
          '"76d803cf-2152-44b2-8e77-2e2b0a7f8ff9"), ("1000", "2018-08-12T23:04:30+00:00", "Salesforce CRM", ' +
          '"Annual renewal for company licenses.", "AP", "7bbf8a89-2b6b-441a-bb67-a485ed9f7aa5"), ' +
          '("250", "2018-03-20T23:04:30+00:00", "JIRA", "Annual renewal for company licenses.", "AP", ' +
          '"0eddb50e-272a-4ca1-8534-dfa042acb63e"), ("750", "2018-07-18T23:04:30+00:00", "GitHub", ' +
          '"Annual renewal for company licenses.", "AP", "ed3f24d7-92b1-4f80-b4cd-91e251bc0ac9")';
        assert.equal(outputQueryString, testQueryString);
      });
    });
  });
});
