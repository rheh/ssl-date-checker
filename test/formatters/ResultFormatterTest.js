var chai = require('chai');
var sinon = require('sinon');
var https = require('https');

var should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

var ResultFormatter = require('../../src/formatters/ResultFormatter');

describe('#SSL Formatter functions ', function() {

    var mock = {
        valid_from: new Date(),
        valid_to: new Date() + 1
    };

    var host = 'google.com';

    describe('Formatter input validation', function () {

        it('throws an Exception when setting invalid format', function() {

            assert.throw(function () {
                var formatter = new ResultFormatter('XML');
                formatter.format();
            }, Error, "Invalid format");
        });
    });

    describe('Setters and Getters work', function () {

        it('Constructor variables stored and recalled', function() {

            var formatter = new ResultFormatter('text');
            formatter.getFormat().should.equal('text');
        });

        it('Setters and getters stored and recalled', function() {

            var formatter = new ResultFormatter('text');
            formatter.setFormat('json');
            formatter.getFormat().should.equal('json');
        });

    });

    describe('Formatters work', function () {

        it('JSON format works', function() {

            var formatter = new ResultFormatter('json');
            formatter.format(host, mock).should.equal(JSON.stringify(mock, null, 4));
        });

        it('Text format works when valid', function() {
            var mock = {
                valid_from: 'Mon Oct 23 2016 19:59:39 GMT+0100 (BST)',
                valid_to: 'Mon Mar 23 2018 19:59:39 GMT+0100 (BST)'
            };

            var expected = "Certification for " + host + "\n" +
                "Issue On: " + mock.valid_from + "\n" +
                "Expires On: " + mock.valid_to + "\n" +
                "Expires in 150 days\n";

            var mockNow = 'Tue Oct 24 2017 11:59:39 GMT+0100 (BST)'
            var formatter = new ResultFormatter('text');
            formatter.format(host, mock, mockNow).should.equal(expected);
        });

        it('Text format works when expired', function() {
            var mock = {
                valid_from: 'Mon Oct 23 2011 19:59:39 GMT+0100 (BST)',
                valid_to: 'Mon Mar 23 2012 19:59:39 GMT+0100 (BST)'
            };

            var expected = "Certification for " + host + "\n" +
                "Issue On: " + mock.valid_from + "\n" +
                "Expires On: " + mock.valid_to + "\n" +
                "This has expired!\n";

            var formatter = new ResultFormatter('text');
            formatter.format(host, mock).should.equal(expected);
        });
    });
});
