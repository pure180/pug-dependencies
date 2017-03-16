[![Build Status](https://travis-ci.org/pure180/pug-dependencies.svg?branch=master)](https://travis-ci.org/pure180/pug-dependencies)
[![Dependency Status](https://david-dm.org/pure180/pug-dependencies.svg)](https://david-dm.org/pure180/pug-dependencies)
# pug-dependencies

Pug-dependencies creates and returns an array of all includes and extends of one Pug-File.

## Prerequisites
```
node.js >= 6.9.0
```

## Install
```
npm install --save pug-dependencies
```

## Usage
```javascript
var PugDependencies = require('pug-dependencies');
var pugDependencies = new PugDependencies('path/to/pug/file.pug');
var dependencies = pugDependencies.dependencies;

console.log(dependencies)
// Returns an array of all dependent files: ["path1", "path2"]
```
