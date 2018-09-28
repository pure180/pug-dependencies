const test = require('tape')
const { resolve } = require('path')

const findDependencies = require('../index.js')
const baseDir = 'test/fixtures'
const expectedDeps = [
  resolve(baseDir, 'extends', 'extends.pug'),
  resolve(baseDir, 'include', 'include1.pug')
]

test('Length of dependencies should be 2', function (t) {
  const deps = findDependencies('test/fixtures/index.pug')

  t.deepEqual(deps, expectedDeps, 'Array of dependencies with a length of 2 should be returned.')
  t.end()
})

test('Dependencies should have correct path when using basedir option', function (t) {
  const deps = findDependencies('test/fixtures/absolute_include.pug', { basedir: resolve(baseDir, 'include') })

  t.deepEqual(deps, expectedDeps, 'Dependencies did not have the correct paths.')
  t.end()
})

test('Absolute path should throw error when basedir option is not set', function (t) {
  try {
    findDependencies('test/fixtures/absolute_include.pug')
  } catch (err) {
    t.deepEqual(err.message, 'the "basedir" option is required to use includes and extends with "absolute" paths')
    t.end()
  }
})
