var is = require('is_js');
var validate = require('./validate');

/*
  * @describe constructor
*/
function PropsValidator(describe, it) {
  if (is.not.existy(describe)) {
    throw Error('<describe> function should be provided.');
  }

  if (is.not.existy(it)) {
    throw Error('<it> function should be provided.');
  }

  if (is.not.function(describe)) {
    throw Error('<describe> should be a function.');
  }

  if (is.not.function(it)) {
    throw Error('<it> should be a function.');
  }

  return validate.bind({_describe: describe, _it: it});
};

module.exports = PropsValidator;
