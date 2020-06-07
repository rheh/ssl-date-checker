const https = require('https');

const TEXT_FORMAT = 'text';
const JSON_FORMAT = 'json';

const ResultFormatter = function(format) {
  this.chosenFormat = format || 'text';
  this.setFormat(this.chosenFormat);
};

ResultFormatter.prototype.setFormat = function(format) {
  this.chosenFormat = format;
};

ResultFormatter.prototype.getFormat = function() {
  return this.chosenFormat;
};

ResultFormatter.prototype.format = function(host, dateInfo, mockNow) {
  if ((this.chosenFormat === TEXT_FORMAT ||
        this.chosenFormat === JSON_FORMAT) === false) {
    throw new Error('Invalid format, options text or json');
  }

  let formattedResult = null;

  // eslint-disable-next-line require-jsdoc
  function dhm(t) {
    const cd = 24 * 60 * 60 * 1000;
    const ch = 60 * 60 * 1000;
    let d = Math.floor(t / cd);
    let h = Math.floor( (t - d * cd) / ch);
    let m = Math.round( (t - d * cd - h * ch) / 60000);

    const pad = function(n) {
      return n < 10 ? '0' + n : n;
    };

    if (m === 60) {
      h++;
      m = 0;
    }

    if (h === 24) {
      d++;
      h = 0;
    }

    return [d, pad(h), pad(m)];
  }

  const expires = new Date(dateInfo.valid_to);
  const now = mockNow ? new Date(mockNow) : new Date();
  const days = dhm(expires - now)[0];

  if (this.chosenFormat === TEXT_FORMAT) {
    formattedResult = 'Certification for ' + host + '\n' +
            'Issue On: ' + dateInfo.valid_from + '\n' +
            'Expires On: ' + dateInfo.valid_to + '\n' +
            (days <= 0 ? 'This has expired!' : 'Expires in ' + days + ' days') +
            '\n';
  } else if (this.chosenFormat === JSON_FORMAT) {
    dateInfo.expires = dhm(expires - new Date())[0];
    dateInfo.expired = days <= 0;
    dateInfo.host = host;

    formattedResult = JSON.stringify(dateInfo, null, 4);
  }

  return formattedResult;
};

module.exports = ResultFormatter;
