[![Build Status](https://travis-ci.org/pure180/pug-dependencies.svg?branch=master)](https://travis-ci.org/pure180/pug-dependencies)
[![Dependency Status](https://david-dm.org/pure180/pug-dependencies.svg)](https://david-dm.org/pure180/pug-dependencies)

# pug-dependencies

Pug-dependencies creates and returns an array of all includes and extends of a pug file.

## Prerequisites

node.js >= 6.9.0

## Install

```sh
npm install --save pug-dependencies
```

## Usage

```js
const resolveDependencies = require('pug-dependencies');
const deps = resolveDependencies('relative/path/to/pug/file.pug');

// returns an array with absolute file paths for all includes and extends
// that the file relative/path/to/pug/file.pug depends on:
console.log(deps)
```

The `resolveDependencies` function accepts options as second argument, [just like Pug](https://pugjs.org/api/reference.html#options).
Use this to i.e. supply the `basedir` in case you want to resolve absolute includes:

```js
const deps = resolveDependencies('relative/path/to/pug/file.pug', {
  basedir: 'relative/path'
});
```
