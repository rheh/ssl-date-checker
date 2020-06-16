const https = require('https');
const Checker = function() {
  this.port = 443;
};

Checker.prototype.getHost = function() {
  return this.host;
};

Checker.prototype.getPort = function() {
  return this.port;
};

Checker.prototype.setHost = function(host) {
  if (!host) {
    throw new Error('Invalid host');
  }

  this.host = host;

  return this;
};

Checker.prototype.setPort = function(port) {
  const portVal = port || 443;
  const numericPort = (!isNaN(parseFloat(portVal)) && isFinite(portVal));

  if (numericPort === false) {
    throw new Error('Invalid port');
  }

  this.port = portVal;

  return this;
};

Checker.prototype.check = function(callback) {
  const options = {
    host: this.host,
    port: this.port,
    method: 'GET',
    rejectUnauthorized: false,
  };

  if (this.host === null || this.port === null) {
    throw new Error('Invalid host or port');
  }

  const req = https.request(options, function(res) {
    res.on('data', (d) => {
      process.stdout.write(d);
    });

    const certificateInfo = res.connection.getPeerCertificate();

    const dateInfo = {
      valid_from: certificateInfo.valid_from,
      valid_to: certificateInfo.valid_to,
    };

    callback(null, dateInfo);
  });

  req.on('error', (e) => {
    callback(e);
  });

  req.end();
};

module.exports = new Checker();
