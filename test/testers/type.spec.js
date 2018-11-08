var React      = require('react');
var expect     = require('chai').expect;
var PropTypes = require('prop-types');
var typeTester = require('../../lib/testers/type');

describe('testers.type', function() {
  it('returns true when type of prop is invalid [array]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { cars: PropTypes.array };
    var props  = {cars: 'BMW'};
    var result = typeTester(HelloWorld, 'cars', 'array', props);
    expect(result).to.equal(true);
  });



  it('returns true when type of prop is invalid [bool]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { hasCar: PropTypes.bool };
    var props  = {hasCar: 'no'};
    var result = typeTester(HelloWorld, 'hasCar', 'boolean', props);
    expect(result).to.equal(true);
  });



  it('returns true when type of prop is invalid [func]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { onClick: PropTypes.func };
    var props  = {onClick: 'call-me-if-you-can'};
    var result = typeTester(HelloWorld, 'onClick', 'function', props);
    expect(result).to.equal(true);
  });



  it('returns true when type of prop is invalid [object]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { assets: PropTypes.object };
    var props  = {assets: 'call-me-if-you-can'};
    var result = typeTester(HelloWorld, 'assets', 'object', props);
    expect(result).to.equal(true);
  });



  it('returns true when type of prop is invalid [string]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.string };
    var props  = {age: 12};
    var result = typeTester(HelloWorld, 'age', 'string', props);
    expect(result).to.equal(true);
  });



  it('returns true when type of prop is invalid [number]', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.number };
    var props  = {age: '12'};
    var result = typeTester(HelloWorld, 'age', 'number', props);
    expect(result).to.equal(true);
  });



  it('returns false when validation error does not relate to the prop under test', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      age: PropTypes.number,
      color: PropTypes.string,
    };
    var props  = {age: 12, color: 15};
    var result = typeTester(HelloWorld, 'age', 'number', props);
    expect(result).to.equal(false);
  });



  it('returns false when validation does not relate to prop having an invalid type', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.number.isRequired };
    var result = typeTester(HelloWorld, 'age', 'number', {});
    expect(result).to.equal(false);
  });
});
