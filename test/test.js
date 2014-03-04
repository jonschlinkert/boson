
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
  }, 'node-foo', 'node-bar']
};

// console.log(bozon(config.a));
// console.log(bozon(config.b));
// console.log(bozon(config.c));
// console.log(bozon(config.d));
// console.log(bozon(config.e));
// console.log(bozon(config.f));
console.log(bozon(config.g));
// console.log(bozon([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));
