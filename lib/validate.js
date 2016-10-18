var assert  = require('assert');
var clone   = require('lodash.clonedeep');
var unset   = require('lodash.unset');
var get     = require('lodash.get');
var set     = require('lodash.set');
var testers = require('./testers');

function validate(Component, schema, fixture) {
  var self = this;

  self._describe('prop validation', function() {
    Object.keys(schema).forEach(function(propName) {
      self._describe('['+ propName +']', function() {
        Object.keys(schema[propName]).forEach(function(spec) {
          var props   = clone(fixture);
          var isValid = null;

          switch(spec) {
            case 'optional':
              unset(props, propName);
              isValid = testers.optionalTester(Component, propName, props);
              break;

            case 'required':
              unset(props, propName);
              isValid = testers.requiredTester(Component, propName, props);
              break;

            case 'type':
              var propType = schema[propName].type;
              if (propType == 'string') {
                set(props, propName, 12345);
              } else {
                set(props, propName, '12345');
              }
              isValid = testers.typeTester(Component, propName, propType, props);
              break;

            case 'instanceOf':
              function InstanceOfFooBar() {}
              var instanceOf = schema[propName].instanceOf;
              set(props, propName, new InstanceOfFooBar());
              isValid = testers.instanceOfTester(Component, propName, instanceOf, props);
              break;

            case 'oneOfType':
              function InstanceOfFooBar() {}
              set(props, propName, new InstanceOfFooBar());
              isValid = testers.oneOfTypeTester(Component, propName, props);
              break;

            case 'oneOf':
              set(props, propName, ':-{');
              isValid = testers.oneOfTester(Component, propName, props);
              break;
          }

          self._it('passes [' + spec + '] test', function() {
            if (isValid == null) { throw Error('tester not found'); }
            assert.ok(isValid);
          });
        });
      });
    });
  });
}

module.exports = validate;
