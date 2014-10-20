var expect = require('chai').expect;
var util = require('../app/util');

var req;

describe('util', function() {
    describe('privacy functionality', function() {
        it('should allow private if source is set', function() {
            req = { query: { source: 'test' }, cookies: {} };
            expect(util.privateOK(req)).to.equal(true);

            req = {};
            expect(util.privateOK(req)).to.equal(false);
        });

        it('should allow private if cookie is set', function() {
            req = { query: {}, cookies: { showPrivate: '1' } };
            expect(util.privateOK(req)).to.equal(true);

            req = { query: {}, cookies: {} };
            expect(util.privateOK(req)).to.equal(false);
        });

        it('recommend setting cookie if source is set and cookie doesn\'t exist', function() {
            req = { query: {}, cookies: {} };
            expect(util.shouldSetPrivateCookie(req)).to.equal(false);

            req = { query: {}, cookies: { showPrivate: '1' } };
            expect(util.shouldSetPrivateCookie(req)).to.equal(false);

            req = { query: { source: 'test' }, cookies: { showPrivate: '1' } };
            expect(util.shouldSetPrivateCookie(req)).to.equal(false);

            req = { query: { source: 'test' }, cookies: {} };
            expect(util.shouldSetPrivateCookie(req)).to.equal(true);
        });
    });
});