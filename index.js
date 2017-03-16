var _         = require( 'lodash' ),
    fs        = require( 'fs' ),
    path      = require( 'path' ),
    pugLexer  = require( 'pug-lexer' ),
    pugParser = require( 'pug-parser' ),
    pugWalk   = require( 'pug-walk' );


var PugDependencies = ( function() {
  'use strict';

  function PugDependencies( file, options ) {
    this.options      = _.merge( this.DEFAULTS, options );
    this.file         = path.join(this.options.basedir, file);


    if ( fs.existsSync( this.file ) ) {
      this.contents = fs.readFileSync(this.file, 'utf8');
    } else {
      console.log(this.file + ', doesn\'t exist or path is wrong');
      return;
    }

    this.dependencies = this.getDependencies();

    return this;
  }

  PugDependencies.prototype.DEFAULTS = {
    basedir :         process.cwd()
  };

  PugDependencies.prototype.getDependencies = function() {
    var _this         = this,
        dependencies  = [],
        dirname       = path.dirname( this.file ),
        lex           = pugLexer( this.contents, {
                        filename: this.file
                      });

    var parse = pugParser( lex );
    var walk  = pugWalk( parse, function(node){
      if ( node.type === 'Include' || node.type === 'RawInclude' || node.type === 'Extends' ) {
        var pathToDependencie =path.join(dirname, node.file.path );
        if ( _.indexOf( _this.dependencies, pathToDependencie ) === -1 )
        dependencies.push(pathToDependencie);
      }
    });
    return dependencies;
  };

  return PugDependencies;
})();

module.exports = PugDependencies;
