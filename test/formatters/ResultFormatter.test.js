const ResultFormatter = require('../../src/formatters/ResultFormatter');

describe('#SSL Formatter functions ', () => {
  const mock = {
    valid_from: new Date(),
    valid_to: new Date() + 1,
  };

  const host = 'google.com';

  describe('Formatter input validation', () => {
    it('throws an Exception when setting invalid format', () => {
      expect(function() {
        const formatter = new ResultFormatter('XML');
        formatter.format();
      }).toThrow(Error, 'Invalid format');
    });
  });

  describe('Setters and Getters work', () => {
    it('Constructor variables stored and recalled', () => {
      const formatter = new ResultFormatter('text');
      expect(formatter.getFormat()).toBe('text');
    });

    it('Setters and getters stored and recalled', () => {
      const formatter = new ResultFormatter('text');
      formatter.setFormat('json');
      expect(formatter.getFormat()).toBe('json');
    });
  });

  describe('Formatters work', () => {
    it('JSON format works', () => {
      const formatter = new ResultFormatter('json');
      expect(formatter.format(host, mock)).toBe(JSON.stringify(mock, null, 4));
    });

    it('Text format works when valid', () => {
      const mock = {
        valid_from: 'Mon Oct 23 2016 19:59:39 GMT+0100 (BST)',
        valid_to: 'Mon Mar 23 2018 19:59:39 GMT+0100 (BST)',
      };

      const expected = 'Certification for ' + host + '\n' +
                'Issue On: ' + mock.valid_from + '\n' +
                'Expires On: ' + mock.valid_to + '\n' +
                'Expires in 150 days\n';

      const mockNow = 'Tue Oct 24 2017 11:59:39 GMT+0100 (BST)';
      const formatter = new ResultFormatter('text');
      expect(formatter.format(host, mock, mockNow)).toBe(expected);
    });

    it('Text format works when expired', () => {
      const mock = {
        valid_from: 'Mon Oct 23 2011 19:59:39 GMT+0100 (BST)',
        valid_to: 'Mon Mar 23 2012 19:59:39 GMT+0100 (BST)',
      };

      const expected = 'Certification for ' + host + '\n' +
                'Issue On: ' + mock.valid_from + '\n' +
                'Expires On: ' + mock.valid_to + '\n' +
                'This has expired!\n';

      const formatter = new ResultFormatter('text');
      expect(formatter.format(host, mock)).toBe(expected);
    });
  });
});
