var utils = require('../utils');

function instanceOfTester(Component, propName, type, props) {
  var componentName = Component.name || Component.displayName;
  var pattern       = 'Warning: Failed prop type: Invalid prop `'+ propName +
    '` of type `.+` supplied to `'+ componentName +'`, expected instance of `' +
    type.name +'`.';
  return utils.throwsError(Component, props, pattern);
}

module.exports = instanceOfTester;
