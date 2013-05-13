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

    var options = this.options({
      dojo: null,
      load: 'build',
      profile: null,
      package: null,
      packages: null,
      require: null,
      requires: null,
      releaseDir: null,
      cwd: null,
      dojoConfig: null,
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

      /*
       * Support both the singular and plural form of the 'package' and 'require' parameters
       */
      ['package', 'require'].forEach(function(dojoParam){
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

      if(!!grunt.option('verbose')) {
          child.stdout.on('data', function (data) {
              grunt.log.write(data);
          });
          child.stderr.on('data', function (data) {
              grunt.log.error(data);
          });
      }
  });

};
