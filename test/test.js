
var log = require('verbalize');
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
  d: ['test/fixtures/*-foo.js', 'test/fixtures/*-bar.js', 'flip', 'test/fixtures/*-baz.js'],

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
  }, 'node-foo', 'node-bar', 'node-baz', 'fez'],

  h: ['test/fixtures/plugin.js'],
  z: 'flim-flam'
};

// console.log('config.a: ', boson.register(config.a));
// console.log('config.b: ', boson.register(config.b));
// console.log('config.c: ', boson.register(config.c));
// console.log('config.d: ', boson.register(config.d));
// console.log('config.e: ', boson.register(config.e));
// console.log('config.f: ', boson.register(config.f));
// console.log('config.g: ', boson.register(config.g));
// console.log('config.h: ', boson.register(config.h));

// console.log(boson.register([['test/fixtures/*.js'], config.a, 'node-foo', config.g]));


// console.log('config.a: ', boson.normalize(config.a));
// console.log('config.b: ', boson.normalize(config.b));
// console.log('config.c: ', boson.normalize(config.c));
// console.log('config.d: ', boson.normalize(config.d));
// console.log('config.e: ', boson.normalize(config.e));
// console.log('config.f: ', boson.normalize(config.f));
// console.log('config.g: ', boson.normalize(config.g));
// console.log('config.h: ', boson.normalize(config.h));

// boson.normalize(config.a);
// boson.normalize(config.b);
// boson.normalize(config.c);
// boson.normalize(config.d);
// boson.normalize(config.e);
// boson.normalize(config.f);
// boson.normalize(config.g);
// boson.normalize(config.h);


// boson.expand(config.a);
// boson.expand(config.b);
// boson.expand(config.c);
// boson.expand(config.d);
// boson.expand(config.e);
// boson.expand(config.f);
// boson.expand(config.g);
// boson.expand(config.h);

// log.success('[boson]:', boson.register(config.a));
// log.success('[boson]:', boson.register(config.b));
// log.success('[boson]:', boson.register(config.c));
// log.success('[boson]:', boson.register(config.d));
// log.success('[boson]:', boson.register(config.e));
// log.success('[boson]:', boson.register(config.f));
// log.success('[boson]:', boson.register(config.g));
// log.success('[boson]:', boson.register(config.h));
// log.success('[boson]:', boson.register(config.z));

log.success('[boson]:', boson.load(config));
