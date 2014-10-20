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
            var req = { query: {}, cookies: { showPrivate: '1' } };
            expect(util.privateOK(req)).to.equal(true);

            req = { query: {}, cookies: {} };
            expect(util.privateOK(req)).to.equal(false);
        });
    });
});