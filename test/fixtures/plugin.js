
module.exports = function(config) {
  var helpers = {};


  helpers.convert = function(str) {
    return str.replace(/<!--\s*([\S]+)\(([\S]+)\)\s*-->/g, '{%= $1($2) %}');
  };

  return helpers;
};