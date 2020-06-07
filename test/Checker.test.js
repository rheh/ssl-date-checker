const https = require('https');
const Checker = require('../src/Checker');

jest.mock('https');

describe('#Checker enforces valid host and port', () => {
  let testContext;

  beforeAll(() => {
    testContext = {};
  });

  describe('Data validation', () => {
    it('throws an Exception when passing nothing', () => {
      expect(function() {
        const checker = new Checker();
      }).toThrow(Error, 'Invalid host');
    });

    it('Defaults port when port not passed', () => {
      const checker = new Checker('google.com');
      expect(checker.getPort()).toBe(443);
    });

    it('throws an Exception when setting host to nothing', () => {
      expect(function() {
        const checker = new Checker('google.com');
        checker.setHost(null);
      }).toThrow(Error, 'Invalid host');
    });

    it('throws an Exception when setting port to a string', () => {
      expect(function() {
        const checker = new Checker('google.com', 'fred');
      }).toThrow(Error, 'Invalid port');
    });

    it('throws an Exception when setting port to a object', () => {
      expect(function() {
        const checker = new Checker('google.com', {});
      }).toThrow(Error, 'Invalid port');
    });

    it('throws an Exception when setting port to a function', () => {
      expect(function() {
        const checker = new Checker('google.com', function() {});
      }).toThrow(Error, 'Invalid port');
    });

    it(
        'throws an Exception when check called without input parameters set',
        () => {
          expect(function() {
            const checker = new Checker('geeksretreat.com');
            checker.host = null;
            checker.port = null;
            checker.check();
          }).toThrow(Error, 'Invalid host or port');
        },
    );
  });

  describe('Setters and Getters work', () => {
    it('Constructor variables stored and recalled', () => {
      const checker = new Checker('google.com', 443);
      expect(checker.getHost()).toBe('google.com');
      expect(checker.getPort()).toBe(443);
    });

    it('Setter stored and recalled', () => {
      const checker = new Checker('google.com', 443);
      checker.setHost('npm.org');
      checker.setPort(8443);
      expect(checker.getHost()).toBe('npm.org');
      expect(checker.getPort()).toBe(8443);
    });
  });
});
