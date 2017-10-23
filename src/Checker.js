/*jslint node: true */
"use strict";

var https = require('https');

var Checker = function (host, port) {

    this.setHost(host);
    this.setPort(port);
};

Checker.prototype.getHost = function () {
    return this.host;
};

Checker.prototype.getPort = function () {
    return this.port;
};

Checker.prototype.setHost = function (host) {

    if (!host) {
        throw new Error("Invalid host");
    }

    this.host = host;
};

Checker.prototype.setPort = function (port) {

    var portVal = port || 443;
    var numericPort = (!isNaN(parseFloat(portVal)) && isFinite(portVal));

    if (numericPort === false) {
        throw new Error("Invalid port");
    }

    this.port = portVal;
};

Checker.prototype.check = function (callback) {

    var options = {
        host: this.host,
        port: this.port,
        method: 'GET',
        rejectUnauthorized: false
    };

    if (this.host === null || this.port === null) {
        throw new Error("Invalid host or port");
    }

    var req = https.request(options, function(res) {

        var certificateInfo = res.connection.getPeerCertificate();

        var dateInfo = {
            valid_from: certificateInfo.valid_from,
            valid_to: certificateInfo.valid_to
        };

        callback(dateInfo);
    });

    req.end();
};

module.exports = Checker;
