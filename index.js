/**
 * Boson <https://github.com/jonschlinkert/boson>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var resolve = require('resolve-dep');
var _ = require('lodash');


var Boson = module.exports = function Boson(config) {
  if (!(this instanceof Boson)) {
    return new Boson(config);
  }

  this.config = config || {};
  this.modules = [];
  this.files = [];
};

Boson.prototype.find = function(patterns, config) {
  return resolve(patterns, config || this.config);
};


Boson.prototype.require = function(patterns) {
  var modules = this.modules;

  this.find(patterns).forEach(function(filepath) {
    modules.push(require(filepath));
  });

  return _.uniq(modules);
};


Boson.prototype.load = function(patterns, config) {
  config = config || this.config;
  var modules = this.modules;

  this.require(patterns).forEach(function(fn) {
    modules.push(typeof fn === 'function' ? fn(config) : fn);
  });

  return _.uniq(modules);
};