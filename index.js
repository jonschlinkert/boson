/**
 * Boson <https://github.com/jonschlinkert/boson>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var resolve = require('resolve-dep');
var _ = require('lodash');


var boson = module.exports = function boson(patterns, config) {
  var result = {};
  if (config) {
    _.extend(result, boson.tryRegister(patterns, config));
  } else {
    // If `config` isn't passed, there is no need to cascaded
    // through all of those try-catches
    _.extend(result, boson.tryRequire(patterns));
  }
  return result;
};


boson.find = function(patterns) {
  return resolve(patterns);
};

