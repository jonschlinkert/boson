
var log = require('verbalize');
var path = require('path');
var _ = require('lodash');
var boson = require('../');


var config = {
  // Raw object
  a: {
    jetsam: function(str) {
      return str + 'two';
    },
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
  d: ['test/fixtures/*-foo.js', 'test/fixtures/*-bar.js', 'flip', 'test/fixtures/*-baz.js'],

  // node-module as string
  e: 'node-foo',

  // array of node-modules
  f: ['node-foo', 'node-bar'],

  // mixture
  plugins: [['test/fixtures/*.js'], {
    one: function(str) {
      return str + 'one';
    },
    flotsam: function(str) {
      return str + 'two';
    },
    two: function(str) {
      return str + 'two';
    },
    three: function(str) {
      return str + 'three';
    }
  }, 'node-foo', 'node-bar', 'node-baz', 'fez'],

  h: ['test/fixtures/plugin.js'],
  z: 'flim-flam'
};

// console.log(boson.register([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));

// log.success('[boson]:', boson.register(config.a));
// log.success('[boson]:', boson.register(config.b));
// log.success('[boson]:', boson.register(config.c));
// log.success('[boson]:', boson.register(config.d));
// log.success('[boson]:', boson.register(config.e));
// log.success('[boson]:', boson.register(config.f));
// log.success('[boson]:', boson.register(config.g));
// log.success('[boson]:', boson.register(config.h));
// log.success('[boson]:', boson.register(config.z));



var fixtures = path.join(process.cwd(), 'test/fixtures/*.js');
var fn = boson.require(['node-*', fixtures]);
// var fn = boson.load(config);


console.log(fn)