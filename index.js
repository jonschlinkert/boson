/**
 * Boson <https://github.com/jonschlinkert/boson>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var resolve = require('resolve-dep');


var boson = module.exports = {};

boson.find = function(patterns, config) {
  return resolve(patterns, config || this.config);
};


boson.require = function(patterns) {
  return boson.find(patterns).map(function(filepath) {
    return require(filepath);
  });
};


boson.load = function(patterns, config) {
  config = config || this.config;
  return boson.require(patterns).map(function(fn) {
    return (typeof fn === 'function') ? fn(config) : fn;
  });
};