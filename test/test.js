
var boson = require('../');

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

console.log('config.a: ', boson(config.a));
console.log('config.b: ', boson(config.b));
console.log('config.c: ', boson(config.c));
console.log('config.d: ', boson(config.d));
console.log('config.e: ', boson(config.e));
console.log('config.f: ', boson(config.f));
console.log('config.g: ', boson(config.g));
// console.log(boson([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));
