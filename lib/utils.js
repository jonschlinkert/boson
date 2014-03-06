const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');

exports.arrayify = function(val) {
  var result = !Array.isArray(val) ? [val] : val;
  return _.flatten(result);
};

exports.tryRequiring = function (item, options) {
  var obj = {};
  var module = require(item);
  if (_.isFunction(module)) {
    _.extend(obj, module(options));
  } else {
    _.extend(obj, module);
  }
  return obj;
};

exports.tryRegistering = function(arr, options) {
  var obj = {};
  file.expand(arr).map(function (filepath) {
    filepath = path.resolve(filepath);
    return _.extend(obj, require(filepath)(options));
  });
  return obj;
};