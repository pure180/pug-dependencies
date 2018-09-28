var test = require('tape');
var path = require('path');

var PugDependencies = require('../index.js'),
    baseDir = 'test/fixtures';

var plugin = function(file, options) {
    return new PugDependencies(file, options);
};

test('Length of dependencies should be 2', function(t) {
  var pugDependencies = plugin('test/fixtures/index.pug');
  var expectedResult = [
    path.join(baseDir, 'extends', 'extends.pug'),
    path.join(baseDir, 'include', 'include1.pug')
  ];
  t.deepEqual(pugDependencies, expectedResult, 'Array of dependencies with a length of 2 should be returned.');
  t.end();
});

test('Dependencies should have correct path when using basedir option', function(t) {
  var pugDependencies = plugin('test/fixtures/absolute_include.pug', { basedir: path.join(baseDir, 'include') });
  var expectedResult = [
    path.join(baseDir, 'extends', 'extends.pug'),
    path.join(baseDir, 'include', 'include1.pug')
  ];
  t.deepEqual(pugDependencies, expectedResult, 'Dependencies did not have the correct paths.');
  t.end();
});

test('Absolute path should throw error when basedir option is not set', function(t) {
  try {
    plugin('test/fixtures/absolute_include.pug');
  } catch (err) {
    t.deepEqual(err.message, 'the "basedir" option is required to use includes and extends with "absolute" paths');
    t.end();
  }
});
