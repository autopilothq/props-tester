var React          = require('react');
var expect         = require('chai').expect;
var PropTypes = require('prop-types');
var requiredTester = require('../../lib/testers/required');



describe('testers.required', function() {
  it('returns true when expected required prop is missing', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: PropTypes.any.isRequired };

    var isRequired = requiredTester(HelloWorld, 'message', {});
    expect(isRequired).to.equal(true);
  });



  it('returns true when expected required prop has undefined as value', function() {
    function Fruity() { return null; }
    Fruity.propTypes = { fruit: PropTypes.any.isRequired };

    var isRequired = requiredTester(Fruity, 'fruit', { fruit: undefined });
    expect(isRequired).to.equal(true);
  });



  it('returns true when expected required prop has null as value', function() {
    function Bready() { return null; }
    Bready.propTypes = { bread: PropTypes.any.isRequired };

    var isRequired = requiredTester(Bready, 'bread', { message: null });
    expect(isRequired).to.equal(true);
  });



  it('returns false when validation error does not relates to the prop', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      message: PropTypes.any.isRequired,
      color: PropTypes.any.isRequired,
    };

    var isRequired = requiredTester(HelloWorld, 'message', {message: 'Hi'});
    expect(isRequired).to.equal(false);
  });



  it('returns false when validation error does not relates to prop being required', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { message: PropTypes.string.isRequired };

    var isRequired = requiredTester(HelloWorld, 'message', {message: 2});
    expect(isRequired).to.equal(false);
  });
});
