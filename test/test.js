var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

var template = {
    default: '<button id="tooltip" title="Your tooltip message goes here">Hey</button>',
    noID: '<button title="Your tooltip message goes here"></button>',
    activeClass: '<button id="tooltip" title="message" data-active-class="foo-bar"></button>',
    tipClass: '<button id="tooltip" title="message" data-tip-class="foo-bar"></button>',
    placement: '<button id="tooltip" title="message" data-placement="right"></button>',
    margin: '<button id="tooltip" title="message" data-margin="20"></button>'
}


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

        var inst;

        before(function ( done ) {
            document.body.innerHTML = template.default;
            inst = $('#tooltip').tooltip();
            done();
        });

        it('should save title attribute value', function () {
            assert.isDefined( inst.title );
            assert.match( inst.title, /Your tooltip message goes here/ );
        });

        it('should remove title attribute from source element', function () {
            assert.isFalse( inst.source[0].hasAttribute('title') );
        });

        it('should create a new element (div) as tooltip message', function () {
            assert.isDefined( inst.tip );
            assert.match( inst.tip[0].nodeName, /DIV/ );
        });

        it('should insert title message into tip\'s html', function () {
            assert.match( inst.tip.html(), /^Your tooltip message goes here$/ );
        });

        it('should add classes to tip element', function () {
            assert.match( inst.tip[0].className, /^tooltip tooltip-top$/ );
        });

        it('should set inline position style to absolute', function () {
            assert.match( inst.tip[0].style.position, /^absolute$/ );
        });

        it('should set aria-hidden attribute to true', function () {
            assert.match( inst.tip.attr('aria-hidden'), /^true$/ );
        });

        it('should use prepended source id for tip id', function () {
            assert.match( inst.tip.attr('id'), /^tooltip-tooltip$/ );
        });

        it('should add tip id to \'aria-labelledby\' on source', function () {
            assert.match( inst.source.attr('aria-labelledby'), /^tooltip-tooltip$/ );
        });

        it('should append tip element to bottom of the body', function () {
            assert.equal( document.body.lastChild, inst.tip[0] );
        });

        it('should show tip on focus of source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip()
            assert.isFalse( inst.tip.hasClass('is-visible') );
            inst.source.trigger( 'focus' );
            assert.isTrue( inst.tip.hasClass('is-visible') );
        });

        it('should hide tip on blur of source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            assert.isTrue( inst.tip.hasClass('is-visible') );
            inst.source.trigger( 'blur' );
            assert.isFalse( inst.tip.hasClass('is-visible') );
        });

        it('should show tip on mouseover of source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip()
            assert.isFalse( inst.tip.hasClass('is-visible') );
            inst.source.trigger( 'mouseover' );
            assert.isTrue( inst.tip.hasClass('is-visible') );
        });

        it('should hide tip on mouseout of source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            assert.isTrue( inst.tip.hasClass('is-visible') );
            inst.source.trigger( 'mouseout' );
            assert.isFalse( inst.tip.hasClass('is-visible') );
        });

        it('should generate random id for tip if no id exists', function () {
            document.body.innerHTML = template.noID;
            inst = $('button').tooltip();
            assert.match( inst.tip.attr('id'), /^tooltip-[\w\d]{4}$/ );
        });

    });

    describe('settings', function () {

        it('should be able to update \'activeClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({activeClass:'foo-bar'}).show();
            assert.match( inst.tip[0].className, /foo-bar$/ );
        });

        it('should be able to update \'activeClass\' setting from html', function () {
            document.body.innerHTML = template.activeClass;
            var inst = $('#tooltip').tooltip().show();
            assert.match( inst.tip[0].className, /foo-bar$/ );
        });

        it('should be able to update \'tipClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({tipClass:'foo-bar'});
            assert.match( inst.tip[0].className, /^foo-bar/ );
        });

        it('should be able to update \'tipClass\' setting from html', function () {
            document.body.innerHTML = template.tipClass;
            var inst = $('#tooltip').tooltip();
            assert.match( inst.tip[0].className, /^foo-bar/ );
        });

        it('should be able to update \'placement\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({placement:'bottom'});
            assert.match( inst.tip[0].className, /tooltip-bottom$/ );
        });

        it('should be able to update \'placement\' setting from html', function () {
            document.body.innerHTML = template.placement;
            var inst = $('#tooltip').tooltip();
            assert.match( inst.tip[0].className, /tooltip-right$/ );
        });

        it('should be able to update \'margin\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({margin:10}).show();
            assert.equal( inst.tip[0].style.top, '-10px' );
        });

        it('should be able to update \'margin\' setting from html', function () {
            document.body.innerHTML = template.margin;
            var inst = $('#tooltip').tooltip().show();
            assert.equal( inst.tip[0].style.top, '-20px' );
        });

        it('should be able to add function to \'onInit\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({
                onInit: function() {
                    this.test = "foo";
                }
            });
            assert.match( inst.test, /foo/ );
        });

        it('should be able to add function to \'onShow\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({
                onShow: function() {
                    this.test = "bar";
                }
            });
            inst.show();
            assert.match( inst.test, /bar/ );
        });

        it('should be able to add function to \'onHide\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip({
                onHide: function() {
                    this.test = "bar";
                }
            });
            inst.show().hide();
            assert.match( inst.test, /bar/ );
        });


    });

    describe('show()', function () {

        it('should set position with top and left styles', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            assert.match( inst.tip[0].style.getPropertyValue('top'), /\d+(\.\d+)?px/ );
            assert.match( inst.tip[0].style.getPropertyValue('left'), /\d+(\.\d+)?px/ );
        });

        it('should add active class and update aria-hidden on tip', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            assert.match( inst.tip.attr('aria-hidden'), /false/ );
            assert.isTrue( inst.tip.hasClass('is-visible') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip();
            inst.show( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('hide()', function () {

        it('should remove active class and update aria-hidden on tip', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show().hide();
            assert.match( inst.tip.attr('aria-hidden'), /true/ );
            assert.isFalse( inst.tip.hasClass('is-visible') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            inst.hide( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('isVisible()', function () {

        it('should return true if tooltip is visible', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().show();
            assert.isTrue( inst.isVisible() );
        });

        it('should return false if tooltip is hidden', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip();
            assert.isFalse( inst.isVisible() );
        });

    });

    describe('setPosition()', function () {

        it('should set position with top and left styles', function () {
            document.body.innerHTML = template.default;
            var inst = $('#tooltip').tooltip().setPosition();
            assert.match( inst.tip[0].style.getPropertyValue('top'), /\d+(\.\d+)?px/ );
            assert.match( inst.tip[0].style.getPropertyValue('left'), /\d+(\.\d+)?px/ );
        });

    });

});
