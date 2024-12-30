/* eslint-disable require-jsdoc */
const https = require('https');

function checkHost(newHost) {
  if (!newHost) {
    throw new Error('Invalid host');
  }

  return true;
}

function checkPort(newPort) {
  const portVal = newPort || 443;
  const numericPort = (!isNaN(parseFloat(portVal)) && isFinite(portVal));

  if (numericPort === false) {
    throw new Error('Invalid port');
  }

  return true;
}

async function checker(host, port) {
  if (host === null || port === null) {
    throw new Error('Invalid host or port');
  }

  checkHost(host);
  checkPort(port);

  return new Promise((resolve, reject) => {
    const options = {
      host,
      port,
      method: 'GET',
      rejectUnauthorized: false,
    };

    const req = https.request(options, function(res) {
      res.on('data', (d) => {
        // process.stdout.write(d);
      });

      const certificateInfo = res.socket.getPeerCertificate();

      console.log(certificateInfo);

      const dateInfo = {
        valid_from: certificateInfo.valid_from,
        valid_to: certificateInfo.valid_to,
        serialNumber: certificateInfo.serialNumber,
        fingerprint : certificateInfo.fingerprint
      };

      resolve(dateInfo);
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

module.exports = checker;
