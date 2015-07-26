var chai = require('chai');
var sinon = require('sinon');
var https = require('https');

var should = chai.should(),
    assert = chai.assert,
    expect = chai.expect;

var Checker = require('../src/Checker');

describe('#Checker enforces valid host and port', function() {

    describe('Data validation', function () {

        it('throws an Exception when passing nothing', function() {

            assert.throw(function () {
                var checker = new Checker();
            }, Error, "Invalid host");
        });

        it('Defaults port when port not passed', function() {

            var checker = new Checker('google.com');
            checker.getPort().should.equal(443);
        });

        it('throws an Exception when setting host to nothing', function() {

            assert.throw(function () {
                var checker = new Checker('google.com');
                checker.setHost(null);
            }, Error, "Invalid host");
        });

        it('throws an Exception when setting port to a string', function() {

            assert.throw(function () {
                var checker = new Checker('google.com', 'fred');
            }, Error, "Invalid port");
        });

        it('throws an Exception when setting port to a object', function() {
            assert.throw(function () {
                var checker = new Checker('google.com', {});
            }, Error, "Invalid port");
        });

        it('throws an Exception when setting port to a function', function() {
            assert.throw(function () {
                var checker = new Checker('google.com', function () {});
            }, Error, "Invalid port");
        });

        it('throws an Exception when check called without input parameters set', function() {
            assert.throw(function () {
                var checker = new Checker('geeksretreat.com');
                checker.host = null;
                checker.port = null;
                checker.check();
            }, Error, "Invalid host or port");
        });

    });

    describe('Setters and Getters work', function () {

        it('Constructor variables stored and recalled', function() {

            var checker = new Checker('google.com', 443);
            checker.getHost().should.equal('google.com');
            checker.getPort().should.equal(443);
        });

        it('Setter stored and recalled', function() {

            var checker = new Checker('google.com', 443);
            checker.setHost('npm.org');
            checker.setPort(8443);
            checker.getHost().should.equal('npm.org');
            checker.getPort().should.equal(8443);
        });
    });

    describe('Request called', function () {

        before(function (done) {
            this.request = sinon.stub(https, 'request');
            this.request.returns({ end: function () {} });
            done();
        });

        after(function(done){
            https.request.restore();
            done();
        });

        it('Https request invoked', function() {

            var checker = new Checker('google.com', 443);
            checker.setHost('npm.org');
            checker.setPort(8443);

            checker.check();

            https.request.called.should.be.equal(true);
        });
    });
});
