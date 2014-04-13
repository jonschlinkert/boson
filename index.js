/**
 * Boson <https://github.com/jonschlinkert/boson>
 * Normalize config values for requireable modules.
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const file = require('fs-utils');
const log = require('verbalize');
const _ = require('lodash');

const boson = module.exports = {};

var toString = Object.prototype.toString;
var type = function(val) {
  return toString.call(val).toLowerCase().replace(/\[object ([\S]+)\]/, '$1');
};

/**
 * Load npm modules from a normalized config
 * @param   {Object}  mod
 * @param   {Object}  params
 * @return  {Object}
 */

boson.loadNpm = function(mod, params) {
  var config = params.config || {};
  var resolved = {}, unresolved = [];
  try {
    _.extend(resolved, require(mod)(config));
  } catch (err) {
    try {
      _.extend(resolved, require(mod));
    } catch(err) {
      unresolved = unresolved.concat(mod);
    }
  }
  return {
    resolved: resolved,
    unresolved: unresolved,
  };
};

/**
 * Load local modules from a normalized config
 * @param   {Object}  filepath
 * @param   {Object}  params
 * @return  {Object}
 */

boson.loadLocal = function(filepath, params) {
  var config = params.config || {};
  var resolved = {}, unresolved = [];
  try {
    _.extend(resolved, require(path.resolve(filepath))(config));
  } catch (err) {
    try {
      _.extend(resolved, require(path.resolve(filepath)));
    } catch (err) {
      unresolved = unresolved.concat(filepath);
    }
  }
  return {
    resolved: resolved,
    unresolved: unresolved,
  };
};


/**
 * Normalize strings to objects
 * @param   {String}  patterns
 * @return  {Object}
 */

boson.normalizeString = function(patterns) {
  return {__patterns__: [patterns]};
};

/**
 * Organize items in an array to strings and objects
 * @param   {String}  patterns
 * @return  {Object}
 */

boson.normalizeArray = function(arr, options) {
  var patterns = [];
  arr.forEach(function(pattern) {
    if (type(pattern) === 'string') {
      patterns = patterns.concat({__patterns__: [pattern]});
    } else {
      return boson.normalize(pattern, options);
    }
  });
  return patterns;
};


boson.normalize = function(value, options) {
  options = options || {};
  var config = _.cloneDeep(value);
  var fn = [];

  if (type(config) === 'string') {
    fn = fn.concat(boson.normalizeString(config, options));
  } if (type(config) === 'array') {
    fn = fn.concat(boson.normalizeArray(config, options));
  } if (type(config) === 'object') {
    fn = fn.concat(config);
  }

  return fn;
};


/**
 * Expand filepaths in the `__patterns__` property
 * on normalized objects.
 *
 * @param   {Object}  config
 * @param   {Object}  options
 * @return  {Object}
 */

boson.expand = function(config, options) {
  config = boson.normalize(config, options);
  var local = [], npm = [];

  config.forEach(function(pattern) {
    if ('__patterns__' in pattern) {
      var files = file.expand(pattern.__patterns__, options);

      if (files.length > 0) {
        local = local.concat(files);
      } else {
        npm = npm.concat(pattern.__patterns__);
      }
      delete pattern.__patterns__;
    }
  });
  return {local: local, npm: npm};
};


boson.register = function (config, options) {
  config = boson.expand(config, options);
  options = options || {};
  var resolved = {}, unresolved = [];

  if (config.local.length > 0) {
    log.verbose.warn('[local]:', config);

    config.local.forEach(function(filepath) {
      var local = boson.loadLocal(filepath, options);
      unresolved = unresolved.concat(local.unresolved);
      _.extend(resolved, local.resolved);
    });
  }

  if (config.npm.length > 0) {
    log.verbose.success('[npm]:', config);

    config.npm.forEach(function(name) {
      var npm = boson.loadNpm(name, options);
      unresolved = unresolved.concat(npm.unresolved);
      _.extend(resolved, npm.resolved);
    });
  }

  return {
    resolved: resolved,
    unresolved: unresolved
  };
};


boson.load = function (config, options) {
  options = options || {};
  var resolved = {}, unresolved = [];

  Object.keys(config).forEach(function(key) {
    var fn = boson.register(config[key], options || {});
    unresolved = unresolved.concat(fn.unresolved);
    _.extend(resolved, fn.resolved);
  });

  return {
    resolved: resolved,
    unresolved: unresolved
  };
};