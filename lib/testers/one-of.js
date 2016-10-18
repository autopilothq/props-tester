var utils = require('../utils');

function oneOfTester(Component, propName, props) {
  var componentName = Component.name || Component.displayName;
  var pattern = 'Warning: Failed prop type: Invalid prop `'+ propName +
    '` of value `.+` supplied to `' + componentName +
    '`, expected one of \\[.+\\]\.';
  return utils.throwsError(Component, props, pattern);
}

module.exports = oneOfTester;
