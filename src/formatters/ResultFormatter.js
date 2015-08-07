/*jslint node: true */
"use strict";

var https = require('https');

var TEXT_FORMAT = 'text';
var JSON_FORMAT = 'json';

var ResultFormatter = function (format) {

    this.choosenFormat = format || 'text';
    this.setFormat(this.choosenFormat);
};

ResultFormatter.prototype.setFormat = function (format) {
    this.choosenFormat = format;
};

ResultFormatter.prototype.getFormat = function () {
    return this.choosenFormat;
};

ResultFormatter.prototype.format = function (host, dateInfo) {

    if ((this.choosenFormat === TEXT_FORMAT ||
        this.choosenFormat === JSON_FORMAT) === false) {
        throw new Error("Invalid format, options text or json");
    }

    var formattedResult = null;

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

    if (this.choosenFormat === TEXT_FORMAT) { 
         
        formattedResult = "Certification for " + host + "\n" +
            "Issue On: " + dateInfo.valid_from + "\n" +
            "Expires On: " + dateInfo.valid_to + "\n" +
            "Expires in " + dhm(expires - new Date())[0] + " days";

    } else if (this.choosenFormat === JSON_FORMAT) {

        dateInfo.expires = dhm(expires - new Date())[0];
        dateInfo.host = host;

        formattedResult = JSON.stringify(dateInfo, null, 4);

    }

    return formattedResult;
};

module.exports = ResultFormatter;
