var Classes = Object.create(null);

/**
 * Create a new User instance.
 * @public
 */
exports.getUserInstance = function getUserInstance() {
  var User       = loadClass('User');

  return new User();
};

exports.getShopInstance = function getShopInstance() {
  var Shop       = loadClass('Shop');

  return new Shop();
};

exports.getProductInstance = function getProductInstance() {
  var Product       = loadClass('Product');

  return new Product();
};

exports.getFavoriteInstance = function getFavoriteInstance() {
  var Favorite       = loadClass('Favorite');

  return new Favorite();
};

exports.getPurchaseInstance = function getPurchaseInstance() {
  var Purchase       = loadClass('Purchase');

  return new Purchase();
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
    case 'Shop':
      Class = require('./js/tableShop');
      break;
    case 'Product':
      Class = require('./js/tableProduct');
      break;
    case 'Favorite':
      Class = require('./js/tableFavorite');
      break;
    case 'Purchase':
      Class = require('./js/tablePurchase');
      break;
    default:
      throw new Error('Cannot find class \'' + className + '\'');
  }

  // Store to prevent invoking require()
  Classes[className] = Class;

  return Class;
}
