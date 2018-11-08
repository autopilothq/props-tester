var React          = require('react');
var PropsValidator = require('../');
var PropTypes = require('prop-types');
var validate       = PropsValidator(describe, it);



describe('validate()', function() {
  describe('#instanceOf', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.instanceOf(Number) };

    var props  = { age: new Number(12) };
    var schema = {
      age: {instanceOf: Number}
    }

    validate(HelloWorld, schema, props);
  });



  describe('#optional', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.number };

    var props  = { age: 32 };
    var schema = {
      age: {optional: true}
    }
    validate(HelloWorld, schema, props);
  });



  describe('#required', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { age: PropTypes.number.isRequired };

    var props  = { };
    var schema = {
      age: {required: true}
    }
    validate(HelloWorld, schema, props);
  });



  describe('#oneOfType', function() {
    var oneOfType = [PropTypes.string, PropTypes.instanceOf(Number)];
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      age: PropTypes.oneOfType(oneOfType)
    };

    var props  = { age: Number(32) };
    var schema = {
      age: {oneOfType: oneOfType}
    }
    validate(HelloWorld, schema, props);
  });



  describe('#oneOf', function() {
    var oneOf = ['C#', 'F#', 'J#'];
    function HelloWorld() { return null; }
    HelloWorld.propTypes = {
      lang: PropTypes.oneOf(oneOf)
    };

    var props  = { lang: 'C#' };
    var schema = {
      lang: {oneOf: oneOf}
    }
    validate(HelloWorld, schema, props);
  });



  describe('#type', function() {
    function HelloWorld() { return null; }
    HelloWorld.propTypes = { displayName: PropTypes.string };

    var props  = { dispalyName: 'mehdivk' };
    var schema = {
      displayName: {type: 'string'}
    }
    validate(HelloWorld, schema, props);
  });
});
