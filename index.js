#! /usr/bin/env node

var Checker = require('./src/Checker');

if (process.argv.length !== 3) {
    console.log("Usage: ssl-date-checker: <host> [<port>]");
    return -1;
}
var userArgs = process.argv.slice(2);
var host = userArgs[0];
var port = userArgs.length === 2 ? userArgs[1] : 443;

var checker = new Checker(host, port);
checker.check(function (dateInfo) {
    console.log("Certification for " + host + "\n" +
            "Issue On: " + dateInfo.valid_from + "\n" +
            "Expires On: " + dateInfo.valid_to);

function dhm(t) {

    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n) {
            return n < 10 ? '0' + n : n;
        };

    if (m === 60){
        h++;
        m = 0;
    }

    if (h === 24){
        d++;
        h = 0;
    }

    return [d, pad(h), pad(m)];
}
    var expires = new Date(dateInfo.valid_to);
    console.log("Expires in " + dhm(expires - new Date())[0] + " days");
});
