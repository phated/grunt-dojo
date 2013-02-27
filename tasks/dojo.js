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
      cwd: null,
      dojoConfig: null
    });

    grunt.log.subhead('Building Dojo...');

    var args = [];
    if(options.dojo){
      args.push(options.dojo);
      args.push('load=' + options.load);

      if(options.profile){
        args.push('--profile', options.profile);
      }

      if(options.packages && Array.isArray(options.packages)){
        options.packages.forEach(function(packagePath){
          args.push('--package', packagePath);
        });
      }

      if(options.package){
        args.push('--package', options.package);
      }

      if(options.dojoConfig){
        args.push('--dojoConfig', options.dojoConfig);
      }
    } else {
      grunt.log.error('No dojo specified');
      done(false);
    }

    var opts = {};
    if(options.cwd){
      opts.cwd = options.cwd;
    }

    grunt.util.spawn({
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

  });

};
