var React             = require('react');
var expect            = require('chai').expect;
var optionalTester    = require('../../lib/testers/optional');

describe('testers.optional', function() {
  it('returns true when missing prop is optional', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: React.PropTypes.string };
    var isOptional = optionalTester(HelloWorld, 'message', {});
    expect(isOptional).to.equal(true);
  });



  it('returns false when there is a validation error', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: React.PropTypes.number.isRequired };
    var isOptional = optionalTester(HelloWorld, 'message', {message: '12'});
      expect(isOptional).to.equal(false);
  });
});
