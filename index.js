#! /usr/bin/env node

var Checker = require('./src/Checker');
var ResultFormatter = require('./src/formatters/ResultFormatter');
var argv = require('yargs')
            .usage('Usage: $0: <host> [-f format] [-p port]')
            .command('json', 'Out format json')
            .command('text', 'Out format textual')
            .demand(1, 'You must supply a host name')
            .argv;

var host = argv._[0];
var format = argv.f === true ? 'text' : argv.f || 'text';
var port = argv.p === true ? 443 : argv.p || 443;

var checker = new Checker(host, port);

checker.check(function (dateInfo) {

    var formatter = new ResultFormatter(format);
    var result = formatter.format(host, dateInfo);
    console.log(result);
});
