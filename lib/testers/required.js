var utils = require('../utils');

function requiredTester(Component, propName, props) {
  var componentName = Component.name || Component.displayName;
  var pattern       = 'Warning: Failed prop type: Required prop `' + propName +
    '` was not specified in `'+ componentName +'`.';
  return utils.throwsError(Component, props, pattern);
}

module.exports = requiredTester;
