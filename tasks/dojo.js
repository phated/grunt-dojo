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

    var userOptions = this.options(),
      options = {},
      defaults = {
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
      };

    /* Copy properties from user configuration first and then
     * copy the non-specified defaults over. This preserves
     * the order in which the user defined the properties.
     */
    grunt.util._.forEach(userOptions, function(value, key){
      options[key] = userOptions[key];
      delete defaults[key];
    });
    grunt.util._.extend(options, defaults);

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

      // Add command line parameters in the order in which they were defined
      grunt.util._.forEach(options, function(value, key){
        var match;
        if(value == null){
          return;
        }
        if(/^dojoConfig|profile|releaseDir|basePath$/.test(key)){
          addParam('--' + key, value);
        }
        else if((match = key.match(/^(package|require)s?$/))){
          /*
           * Support both the singular and plural form of the 'package' and 'require' parameters
           */
          if(!Array.isArray(value)){
            value = [value];
          }
          value.forEach(function(value){
            addParam('--' + match[1], value);
          });
        }
      });

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
