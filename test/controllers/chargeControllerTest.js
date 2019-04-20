'use strict';

const sinon = require('sinon');

const chargeService = require('../../api/services/chargeService');
const chargeController = require('../../api/controllers/chargeController');

describe('charge API', () => {
  describe('/charges/build', () => {
    let mockBuildMethod = null;

    beforeEach(() => {
      mockBuildMethod = sinon.stub(chargeService, 'build');
    });

    afterEach(() => {
      mockBuildMethod.restore();
    });

    it('will default the charge file record count to 10', () => {
      chargeController.build({}, {});

      sinon.assert.calledWith(mockBuildMethod, 10);
    });

    it('uses the "count" query parameter for charge file record count, if present', () => {
      const mockRequest = { // TODO: Find a better way to mock node requests.
        query: {
          count: 25
        }
      };

      chargeController.build(mockRequest, {});

      sinon.assert.calledWith(mockBuildMethod, 25);
    });
  });
});
