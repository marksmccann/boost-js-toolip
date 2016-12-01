var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

describe('Boost JS Tooltip', function () {

    jsdom()

    before(function ( done ) {
        $ = require('jquery')
        boost = require('boost-js')
        tooltip = require('../dist/tooltip.min.js')
        $.fn.tooltip = boost( tooltip.plugin, tooltip.defaults );
        done();
    });

    describe('creation', function () {

        it('should have added plugin to jQuery\'s prototype', function () {
            assert.isDefined( $.fn.tooltip );
        });

    });

    describe('instantiation', function () {

    });

    describe('settings', function () {

    });

    describe('show()', function () {

    });

    describe('hide()', function () {
    });

    describe('setPosition()', function () {

    });

});