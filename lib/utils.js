const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');

exports.arrayify = function(val) {
  var result = !Array.isArray(val) ? [val] : val;
  return _.flatten(result);
};
