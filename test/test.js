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
  }, 'node-foo', 'node-bar']
};


// console.log(boson(config.a));
// console.log(boson(config.b));
// console.log(boson(config.c));
// console.log(boson(config.d));
// console.log(boson(config.e));
// console.log(boson(config.f));
console.log(boson(config.g));
// console.log(boson([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));