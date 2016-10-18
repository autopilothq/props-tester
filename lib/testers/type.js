var utils = require('../utils');

function typeTester(Component, propName, propType, props) {
  var componentName = Component.name || Component.displayName;
  var pattern       = 'Warning: Failed prop type: Invalid prop `'+ propName +
    '` of type `.+` supplied to `'+ componentName +'`, expected `'+ propType +
    '`.';
  return utils.throwsError(Component, props, pattern);
}

module.exports = typeTester;
