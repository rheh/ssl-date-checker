#! /usr/bin/env node
/* eslint-disable require-jsdoc */

const checker = require('../index.js');
const ResultFormatter = require('../src/formatters/ResultFormatter');
const argv = require('yargs')
    .usage('Usage: $0: <host> [-f format] [-p port]')
    .command('json', 'Out format json')
    .command('text', 'Out format textual')
    .demand(1, 'You must supply a host name')
    .argv;

async function check(chosenHost, chosenPort) {
  try {
    const dateInfo = await checker(chosenHost, chosenPort);
    const formatter = new ResultFormatter(format);
    console.log(formatter.format(chosenHost, dateInfo));

    process.exit(0);
  } catch (error) {
    const code = error.code;

    if (code === 'ENOTFOUND') {
      console.log('The domain that you are trying to reach is unavailable or malformed.');
    } else if (code === 'ECONNREFUSED') {
      console.log('The domain that you are trying cannot be reach on specified port.');
    } else {
      console.log(error);
    }

    process.exit(-1);
  }
}

const host = argv._[0];
const format = argv.f === true ? 'text' : argv.f || 'text';
const port = argv.p === true ? 443 : argv.p || 443;

check(host, port);
