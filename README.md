# ssl-date-checker v1.0.0

[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![NPM version][npm-image]][npm-url]

Nodejs Library to check and report on the issues on and expiration date of a given SSL certificate for a given domain.

Usage:

$ ssl-date-checker host [-f text|json] [-p port]

Example results:

$ ssl-date-checker npm.org

Certification for npm.org
Issue On: Dec 13 00:51:56 2014 GMT
Expires On: Jan 13 11:24:29 2017 GMT
Expires in 536 days

$ ssl-date-checker npm.org -f json

Example results:

{
    "valid_from": "Oct 15 09:57:00 2014 GMT",
    "valid_to": "Oct 16 09:57:00 2015 GMT",
    "expires": 69,
    "host": "iptorrents.com"
}

## Installing

npm install ssl-date-checker

## Contributors

One-man-band at the moment.  Contact me at twitter on @rayhammond, or, via my blog here http://geeksretreat.wordpress.com if you are interest in getting involved.

## License

MIT
