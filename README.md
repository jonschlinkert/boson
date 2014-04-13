# boson [![NPM version](https://badge.fury.io/js/boson.png)](http://badge.fury.io/js/boson)

> Normalize config for requireable modules.

```bash
npm i boson --save
```

## Usage

```js
var boson = require('boson');
```

### boson.register(patterns, options)

```js
// register an array of mixed local and npm modules
boson.register(['local/files/*.js'])
// or as a string
boson.register('some-npm-module')
// or an an object
boson.register({
  one: function(str) {
    return str + 'one';
  }
});
```

Or a mixture of the above:

```js
boson.register(['local/files/*.js'], 'some-npm-module', {
  one: function(str) {
    return str + 'one';
  }
});
```

Returns an object:

```js
{
  // object of resolved modules
  resolved: {
    one: [function],
    two: [function],
    ...
  },
  // array of unresolved modules
  unresolved: ['flim-flam']
}
```

### boson.load(config, options)

Wraps `boson.register()` to load an object with multiple configurations, e.g:

```js
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
  z: 'flim-flam'
};
```

Returns an object:

```js
{
  // object of resolved modules
  resolved: {
    one: [function],
    two: [function],
    ...
  },
  // array of unresolved modules
  unresolved: ['flim-flam']
}
```

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert), contributors.
Released under the [MIT license](./LICENSE-MIT)