/*
 * grunt-dojo
 * https://github.com/phated/grunt-dojo
 *
 * Copyright (c) 2013 Blaine Bublitz
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  grunt.registerMultiTask('dojo', 'build dojo by spawning a child process', function(){

    var done = this.async();

    /**
     * @namespace defaults
     */
    var options = this.options({
      /**
       * Path to dojo.js file in Dojo source
       * @type {String}
       * @memberOf defaults
       * @default
       */
      dojo: null,
      /**
       * Utility to bootstrap
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      load: 'build',
      /**
       * Profile for the build
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      profile: null,
      /**
       * Profile for the build
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      profiles: null,
      /**
       * Config file for dojox/app
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      appConfigFile: null,
      /**
       * Location to search for package.json
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      package: null,
      /**
       * Array of locations to search for package.json files
       * @type {Array=}
       * @memberOf defaults
       * @default
       */
      packages: null,
      /**
       * Module to require for the build
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      require: null,
      /**
       * Array of modules to require for the build
       * @type {Array=}
       * @memberOf defaults
       * @default
       */
      requires: null,
      /**
       * Release directory for the build
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      releaseDir: null,
      /**
       * Directory to execute build within
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      cwd: null,
      /**
       * Location of dojoConfig to be used in build
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      dojoConfig: null,
      /**
       * Base Path to pass at the command line
       * Takes precedence over all other basePaths
       * @type {String=}
       * @memberOf defaults
       * @default
       */
      basePath: null
    });

    grunt.log.subhead('Building Dojo...');

    var args = [];
    /*
     * Add parameter(s) to the argument list and log them, if in verbose mode.
     */
    var addParam = function() {
        grunt.verbose.write("\t");
        grunt.util._.forEach(arguments, function(param) {
            args.push(param);
            grunt.verbose.write(param +" ");
        });
        grunt.verbose.write("\n");
    };

    if(options.dojo){
      grunt.verbose.writeln("Dojo build parameters:");
      addParam(options.dojo);
      addParam('load=' + options.load);

      if(options.basePath){
        addParam('--basePath', options.basePath);
      }
      if(options.profile){
        addParam('--profile', options.profile);
      }
      if(options.appConfigFile){
        addParam('--appConfigFile', options.appConfigFile);
      }

      /*
       * Support both the singular and plural form of the 'package' and 'require' parameters
       */
      ['package', 'require', 'profile'].forEach(function(dojoParam){
          if(!Array.isArray(options[dojoParam+'s'])) {
            options[dojoParam+'s'] = [];
          }
          if(options[dojoParam]){
            options[dojoParam+'s'].push(options[dojoParam]);
          }
          options[dojoParam+'s'].forEach(function(paramValue){
           addParam('--'+dojoParam, paramValue);
          });
      });


      if(options.dojoConfig){
       addParam('--dojoConfig', options.dojoConfig);
      }

      if(options.releaseDir){
       addParam('--releaseDir', options.releaseDir);
      }
    } else {
      grunt.log.error('No dojo specified');
      done(false);
    }

    var opts = {};
    if(options.cwd){
      opts.cwd = options.cwd;
    }

    var child = grunt.util.spawn({
      cmd: 'node',
      args: args,
      opts: opts
    }, function(err, result){
      if(err){
        grunt.log.error(err);
        return done(false);
      }

      grunt.log.success('Dojo Successfully Built...');

      done();
    });

    child.stdout.on('data', function (data) {
      grunt.verbose.write(data);
    });
    child.stderr.on('data', function (data) {
      grunt.verbose.error(data);
    });
  });

};
