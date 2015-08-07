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

        it('Text format works', function() {

            var expected = "Certification for " + host + "\n" + 
                "Issue On: " + mock.valid_from + "\n" +
                "Expires On: " + mock.valid_to;

            var formatter = new ResultFormatter('text');
            formatter.format(host, mock).should.equal(expected);
        });
    });
});
