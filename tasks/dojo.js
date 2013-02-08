/*
 * grunt-dojo
 * https://github.com/phated/grunt-dojo
 *
 * Copyright (c) 2012 Blaine Bublitz
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

    'use strict';

    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

    // ==========================================================================
    // TASKS
    // ==========================================================================

    grunt.registerMultiTask('dojo', 'build dojo by spawning a child process', function () {

        var utils = grunt.utils;
        var done = this.async();
        var util = require('util');

        grunt.log.subhead('Building Dojo...');

        var args = [];
        if (this.data.dojo) {
            args.push(this.data.dojo);
            args.push('load=' + (this.data.load ? this.data.load : 'build'));

            if (this.data.profile) {
                args.push('--profile', this.data.profile);
            }

            if (util.isArray(this.data.packages)) {
                this.data.packages.forEach(function (packagesPath) {
                    args.push('--package', packagesPath);
                });
            } else if (this.data.packages) {
                args.push('--package', this.data.packages);
            }

            if (this.data.dojoConfig) {
                args.push('--dojoConfig', this.data.dojoConfig);
            }
        }

        var opts = {};
        if (this.data.cwd) {
            opts.cwd = this.data.cwd;
        }

        debugger;

        utils.spawn({
            cmd: 'node',
            args: args,
            opts: opts
        }, function (err, result) {
            if (err) {
                grunt.log.error(err);
                return done(false);
            }

            grunt.log.success('Dojo Successfully Built...');

            done();
        });

    });

};
