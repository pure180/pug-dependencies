const { readFileSync } = require('fs')
const { dirname, isAbsolute, join, resolve } = require('path')
const pugParser = require('pug-parser')
const pugLexer = require('pug-lexer')
const pugWalk = require('pug-walk')

const DEPENDENCY_NODE_TYPES = ['Extends', 'Include', 'RawInclude']

module.exports = (file, options) => {
  const contents = readFileSync(file, 'utf8')
  const dependencies  = []
  const dir = dirname(file)
  const lex = pugLexer(contents, { filename: file })
  const parsed = pugParser(lex)

  pugWalk(parsed, node => {
    if (DEPENDENCY_NODE_TYPES.includes(node.type)) {
      const filePath = node.file.path
      let dependencyPath

      if (isAbsolute(filePath)) {
        const { basedir } = options || {}
        if (basedir) {
          dependencyPath = join(basedir, filePath)
        } else {
          // mimic pug when receiving an absolute path and basedir is not set
          throw new Error('the "basedir" option is required to use includes and extends with "absolute" paths')
        }
      } else {
        dependencyPath = resolve(dir, filePath)
      }

      if (dependencies.indexOf(dependencyPath) === -1) {
        dependencies.push(dependencyPath)
      }
    }
  })

  return dependencies
}
