const https = require('https');
const checker = require('../src/Checker');

jest.mock('https');

describe('#checker enforces valid host and port', () => {
  let testContext;

  beforeAll(() => {
    testContext = {};
  });

  describe('Data validation', () => {
    it('throws an Exception when passing nothing', () => {
      expect(async function() {
        await checker(null, null).rejects.toMatch('Invalid host');
      });
    });

    it('throws an Exception when passing undefined host', () => {
      expect(async function() {
        await checker(undefined, 443).rejects.toMatch('Invalid host');
      });
    });

    it('throws an Exception when setting host to nothing', () => {
      expect(async function() {
        await checker(null, 'google.com').rejects.toMatch('Invalid host');
      });
    });

    it('throws an Exception when setting port to a string', () => {
      expect(async function() {
        checker('google.com', 'fred').rejects.toMatch('Invalid port');
      });
    });

    it('throws an Exception when setting port to a object', () => {
      expect(async function() {
        await checker('google.com', {}).rejects.toMatch('Invalid port');
      });
    });

    it('throws an Exception when setting port to a function', () => {
      expect(async function() {
        await checker('google.com').rejects.toMatch('Invalid port');
      });
    });
  });
});
