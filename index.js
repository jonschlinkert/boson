/**
 * Boson <https://github.com/jonschlinkert/boson>
 * Normalize config values for requireable modules.
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');
const utils = require('./lib/utils');

module.exports = function (config, options) {
  options = options || {};

  var obj = {};

  // First, coerce the config into a flattened array
  config = utils.arrayify(config);

  // Next, iterate over each item in the array
  config.forEach(function(item) {

    // If config item is defined as an object,
    // directly extend the context with the object
    if (_.isPlainObject(item)) {
      _.extend(obj, item);
    } else if (_.isString(item) || _.isArray(item)) {
      // Otherwise, if item is defined as a string...
      try {
        // Try to require the item as a node module
        _.extend(obj, utils.tryRequiring(item, options));
      } catch(e) {
        // If it's not a requireable module, we'll assume
        // it's either a filepath or glob pattern and try
        // to expand it then try to require it.
        try {
          _.extend(obj, utils.tryRegistering(item, options));
        } catch (e) {
          e.origin = __filename;
          e.message = 'No extensions found: (error code "' + e.code + '").';
          throw new Error(e);
        }
      }
    }
  });
  return obj;
};
