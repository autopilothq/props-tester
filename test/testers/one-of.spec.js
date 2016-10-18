var React              = require('react');
var expect             = require('chai').expect;
var oneOfTester = require('../../lib/testers/one-of');

describe('testers.oneOf', function() {
  it('returns true when value is not in enum', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { lang: React.PropTypes.oneOf(['js', 'c#']) };
    var oneOf = oneOfTester(HelloWorld, 'lang', {lang: 'go'});
    expect(oneOf).to.equal(true);
  });



  it('returns false when error does not relate to the prop under test', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      lang: React.PropTypes.oneOf(['js', 'c#']),
      name: React.PropTypes.string,
    };

    var oneOf = oneOfTester(HelloWorld, 'lang', {lang: 'js', name: 2});
    expect(oneOf).to.equal(false);
  });



  it('returns false when error does not relate to enum value', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      fruit: React.PropTypes.oneOf(['apple', 'orange']).isRequired,
    };

    var oneOf = oneOfTester(HelloWorld, 'fruit', {});
    expect(oneOf).to.equal(false);
  });
});
