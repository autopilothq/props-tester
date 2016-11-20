var utils = require('../utils');

function requiredTester(Component, propName, props) {
  var componentName = Component.name || Component.displayName;
  var patterns = [
    /* Prior to React 15.4.0 */
    'Warning: Failed prop type: Required prop `' + propName +
    '` was not specified in `'+ componentName +'`.',

    /* React 15.4.0 */
    'Warning: Failed prop type: The prop `' + propName +
    '` is marked as required in `' + componentName +
    '`, but its value is `undefined`.',

    'Warning: Failed prop type: The prop `' + propName +
    '` is marked as required in `' + componentName +
    '`, but its value is `null`.'
  ];

  return utils.throwsError(Component, props, patterns);
}

module.exports = requiredTester;
