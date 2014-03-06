
var bozon = require('../');

var config = {
  // Raw object
  a: {
    one: function(str) {
      return str + 'one';
    },
    two: function(str) {
      return str + 'two';
    },
    three: function(str) {
      return str + 'three';
    }
  },
  // String of glob patterns
  b: 'test/fixtures/*.js',
  // Arrays of glob patterns
  c: ['test/fixtures/*.js'],
  d: ['test/fixtures/*-foo.js', 'test/fixtures/*-bar.js', 'test/fixtures/*-baz.js'],

  // node-module as string
  e: 'node-foo',

  // array of node-modules
  f: ['node-foo', 'node-bar'],

  // mixture
  g: [['test/fixtures/*.js'], {
    one: function(str) {
      return str + 'one';
    },
    two: function(str) {
      return str + 'two';
    },
    three: function(str) {
      return str + 'three';
    }
  }, 'node-foo', 'node-bar', 'node-baz']
};

console.log('config.a: ', bozon(config.a));
console.log('config.b: ', bozon(config.b));
console.log('config.c: ', bozon(config.c));
console.log('config.d: ', bozon(config.d));
console.log('config.e: ', bozon(config.e));
console.log('config.f: ', bozon(config.f));
console.log('config.g: ', bozon(config.g));
// console.log(bozon([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));
