var Classes = Object.create(null);

/**
 * Create a new User instance.
 * @public
 */
exports.getUserInstance = function getUserInstance() {
  var User       = loadClass('User');

  return new User();
};

/**
 * Load the given class.
 * @private
 */
function loadClass(className) {
  var Class = Classes[className];

  if (Class !== undefined) {
    return Class;
  }

  // This uses a switch for static require analysis
  switch (className) {
    case 'User':
      Class = require('./js/tableUser');
      break;
    default:
      throw new Error('Cannot find class \'' + className + '\'');
  }

  // Store to prevent invoking require()
  Classes[className] = Class;

  return Class;
}
