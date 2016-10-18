var React              = require('react');
var expect             = require('chai').expect;
var isInstanceOfTester = require('../../lib/testers/instance-of');

describe('testers.isInstanceOf', function() {
  it('returns true when class type of prop doesnt match spec', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: React.PropTypes.instanceOf(String) };
    var isInstanceOf = isInstanceOfTester(HelloWorld, 'message', String, {message: false});
    expect(isInstanceOf).to.equal(true);
  });



  it('returns false when class type of prop matches spec', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: React.PropTypes.instanceOf(String) };
    var props = {message: new String('Hello World!')};
    var isInstanceOf = isInstanceOfTester(HelloWorld, 'message', String, props);
    expect(isInstanceOf).to.equal(false);
  });



  it('returns false when error does not relate to the prop under test', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      message: React.PropTypes.instanceOf(String),
      age: React.PropTypes.instanceOf(Number),
    };

    var props        = { message: new String('Hi'), age: '20'};
    var isInstanceOf = isInstanceOfTester(HelloWorld, 'message', String, props);
    expect(isInstanceOf).to.equal(false);
  });



  it('returns false when error does not relate to type mismatch', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { name: React.PropTypes.instanceOf(String).isRequired };

    var isInstanceOf = isInstanceOfTester(HelloWorld, 'name', String, {});
    expect(isInstanceOf).to.equal(false);
  });
});
