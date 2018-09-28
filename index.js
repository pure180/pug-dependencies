var _         = require( 'lodash' ),
    fs        = require( 'fs' ),
    path      = require( 'path' ),
    pugLexer  = require( 'pug-lexer' ),
    pugParser = require( 'pug-parser' ),
    pugWalk   = require( 'pug-walk' );


var PugDependencies = ( function() {
  'use strict';

  function PugDependencies( file, options ) {
    this.file = file;
    this.options = options || {};

    try {
      fs.existsSync( this.file );
    } catch (error) {
      throw error;
    }

    this.contents = fs.readFileSync(this.file, 'utf8');

    return this.getDependencies();
  }

  PugDependencies.prototype.getDependencies = function() {
    var _this         = this,
        dependencies  = [],
        basedir       = this.options.basedir,
        dirname       = path.dirname( this.file ),
        lex           = pugLexer( this.contents, {
                        filename: this.file
                      });

    var parse = pugParser( lex );
    var walk  = pugWalk( parse, function(node){
      if ( node.type === 'Include' || node.type === 'RawInclude' || node.type === 'Extends' ) {
        var filePath = node.file.path
        var pathToDependency

        if ( path.isAbsolute(filePath) ) {
          if ( basedir ) {
            pathToDependency = path.join(basedir, filePath);
          } else {
            // mimic pug when receiving an absolute path and basedir is not set
            throw new Error('the "basedir" option is required to use includes and extends with "absolute" paths');
          }
        } else {
          pathToDependency = path.join(dirname, filePath);
        }

        if ( _.indexOf( dependencies, pathToDependency ) === -1 ){
          dependencies.push(pathToDependency);
        }
      }
    });
    return dependencies;
  };

  return PugDependencies;
})();

module.exports = PugDependencies;
