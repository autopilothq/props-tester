var utils = require('../utils');

function optionalTester(Component, name, props) {
  return utils.doesNotThrowError(Component, props);
}

module.exports = optionalTester;
