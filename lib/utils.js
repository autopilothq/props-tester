var React = require('react');

/*
* @description patches console.error so it will throw an error if React tries to
* use it to log a prop invalidation error. Returns original console.error
*
* @returns      {function}
*/
function _patchConsoleError() {
  var error = console.error;
  console.error = function(err) {

    if (/(Invalid prop|Failed prop type:)/.test(err)) {
      throw new Error(err.split('\n')[0]);
    }
    error.apply(console, arguments);
  }

  return error;
}

/*
*
* @description creates an instance of provided component and props. Validates
* if creation of component instance fails with expected error pattern or not
*
* @param      {function}    Component   React component
* @param      {object}      props       Component props
* @param      {string}      pattern     error pattern
*
* @returns    {boolean}
*
*/
function throwsError(Component, props, pattern) {
  /* patch console.error so it throws an error instead of logging it */
  var console_error = _patchConsoleError();
  var isValid       = false;

  try {
    React.createElement(Component, props);
  } catch (err) {
    var regex = new RegExp(pattern);
    isValid   = regex.test(err.message);
  }

  console.error = console_error;
  return isValid;
}

/*
*
* @description creates an instance of provided component using passed props.
* returns True if React successfully creates an instance of component or
* False if React fails to create an instance of component
*
* @param      {function}    Component   React component
* @param      {object}      props       Component props
*
* @returns    {boolean}
*
*/
function doesNotThrowError(Component, props) {
  /* patch console.error so it throws an error instead of logging it */
  var console_error = _patchConsoleError();
  var threwError    = true;

  try {
    React.createElement(Component, props);
  } catch (err) {
    threwError = false;
  }

  console.error = console_error;
  return threwError;
}

module.exports = {
  throwsError       : throwsError,
  doesNotThrowError : doesNotThrowError,
};
