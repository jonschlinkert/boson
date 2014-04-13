/**
 * Boson <https://github.com/jonschlinkert/boson>
 * Normalize config values for requireable modules.
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');
const utils = require('./lib/utils');

function tryRequiring(item, options) {
  var obj = {};
  var module = require(item);
  if (_.isFunction(module)) {
    _.extend(obj, module(options));
  } else {
    _.extend(obj, module);
  }
  return obj;
};

function tryRegistering(arr, options) {
  var obj = {};
  file.expand(arr).map(function (filepath) {
    var module = require(path.resolve(filepath));

    try {
      return _.extend(obj, module(options));
    } catch (e) {
      return _.extend(obj, module);
    }
  });
  return obj;
};

module.exports = function (config, options) {
  options = options || {};

  var context = {};

  // First, coerce the config into a flattened array
  config = utils.arrayify(config);

  // Next, iterate over each item in the array
  config.forEach(function (arr) {

    // If config arr is defined as an object, extend the context directly
    if (_.isPlainObject(arr)) {
      _.extend(context, arr);
    } else {

      file.expand(arr).map(function (filepath) {
        // console.log(filepath);
      });

      // Otherwise, if arr is defined as a string...
      try {
        // Try to require the arr as a node module
        _.extend(context, tryRequiring(arr, options));
      } catch (e) {
        // If it's not a requireable module, we'll assume
        // it's either a filepath or glob pattern and try
        // to expand it then try to require it.
        try {
          _.extend(context, tryRegistering(arr, options));
        } catch (e) {
          // e.origin = __filename;
          // e.message = 'Module could not be registered: (error code "' + e.code + '").';
          // throw new Error(e);
        }
      }
    }

  });

  return context;
};