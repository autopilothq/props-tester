var utils = require('../utils');

function oneOfTypeTester(Component, propName, props) {
  var componentName = Component.name || Component.displayName;
  var pattern       = 'Warning: Failed prop type: Invalid prop `'+ propName +
    '` supplied to `'+ componentName +'`.';
  return utils.throwsError(Component, props, pattern);
}

module.exports = oneOfTypeTester;
