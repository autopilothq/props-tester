var React           = require('react');
var expect          = require('chai').expect;
var oneOfTypeTester = require('../../lib/testers/one-of-type');

describe('testers.oneOfType', function() {
  it('returns true when value is not in enum', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      foo: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.instanceOf(Number)
      ])
    };
    var oneOfType = oneOfTypeTester(HelloWorld, 'foo', {foo: false});
    expect(oneOfType).to.equal(true);
  });



  it('returns false when error does not relate to the unit under test', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      foo: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.instanceOf(Number)
      ]),
      bar: React.PropTypes.string
    };
    var oneOfType = oneOfTypeTester(HelloWorld, 'foo', {foo: false, bar: 1});
    expect(oneOfType).to.equal(false);
  });



  it('returns false when error does not relate to invalid type', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      foo: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.instanceOf(Number)
      ]).isRequired
    };
    var oneOfType = oneOfTypeTester(HelloWorld, 'foo', {});
    expect(oneOfType).to.equal(false);
  });
});
