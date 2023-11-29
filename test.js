// test.js

const assert = require('assert');
const { generatePaylink, getPaylinks } = require('./generate&get');

// Use a valid API token for testing
const mockApiToken = require('./utils');

describe('DevFundMe SDK Functions', function () {
  // Set a higher timeout for the entire suite
  this.timeout(5000); // 5000ms or 5 seconds

  it('should generate a paylink', async function () {
    try {
      const paylink = await generatePaylink(mockApiToken, 100, 'Test note', 'https://example.com/return', {}, 'John Doe', 'john@example.com');
      console.log('Generated paylink:', paylink);

      // Additional assertions
      assert.notStrictEqual(paylink, undefined, 'Paylink should not be undefined');
      assert.notStrictEqual(paylink, null, 'Paylink should not be null');
      assert.ok(paylink.id, 'Paylink ID should exist');
      assert.ok(paylink.pay_url, 'Paylink pay_url should exist');
      // Add more assertions based on your API response structure

    } catch (error) {
      console.error('Error generating paylink:', error.message);
      throw error;
    }
  });

  it('should get a list of paylinks', async function () {
    try {
      const paylinks = await getPaylinks(mockApiToken);
      console.log('Paylinks:', paylinks);

      // Additional assertions
      assert.ok(Array.isArray(paylinks), 'Paylinks should be an array');
      // Add more assertions based on your API response structure

    } catch (error) {
      console.error('Error getting paylinks:', error.message);
      throw error;
    }
  });

  // Add more test cases for different scenarios
});
