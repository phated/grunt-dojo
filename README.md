# grunt-dojo

Build Dojo inside a Grunt task

## Compatibility

grunt-dojo `>=0.2.0` works with Grunt `~0.4.0`

For Grunt `~0.3.0`: use `grunt-dojo@0.1.3`

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-dojo`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-dojo');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Usage

```javascript
dojo: {
  dist: {
    options: {
      dojo: 'path/to/dojo.js', // Path to dojo.js file in dojo source
      load: 'build', // Optional: Utility to bootstrap (Default: 'build')
      profile: 'app.profile.js', // Profile for build
      profiles: [], // Optional: Array of Profiles for build
      appConfigFile: '', // Optional: Config file for dojox/app
      package: '', // Optional: Location to search package.json (Default: nothing)
      packages: [], // Optional: Array of locations of package.json (Default: nothing)
      require: '', // Optional: Module to require for the build (Default: nothing)
      requires: [], // Optional: Array of modules to require for the build (Default: nothing)
      action: '', // Optional: Build action, release, help. clean has been deprecated.
      cwd: './', // Directory to execute build within
      dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
      // Optional: Base Path to pass at the command line
      // Takes precedence over other basePaths
      // Default: null
      basePath: '',
      ignoreErrors: true // Options (default: false): Grunt task returns successful even if there are errors in the dojo build
    }
  },
  options: {
    // You can also specify options to be used in all your tasks
    dojo: 'path/to/dojo.js', // Path to dojo.js file in dojo source
    load: 'build', // Optional: Utility to bootstrap (Default: 'build')
    profile: 'app.profile.js', // Profile for build
    profiles: [], // Optional: Array of Profiles for build
    appConfigFile: '', // Optional: Config file for dojox/app
    package: '', // Optional: Location to search package.json (Default: nothing)
    packages: [], // Optional: Array of locations of package.json (Default: nothing)
    require: '', // Optional: Module to require for the build (Default: nothing)
    requires: [], // Optional: Array of modules to require for the build (Default: nothing)
    action: '', // Optional: Build action, release, help. clean has been deprecated.
    cwd: './', // Directory to execute build within
    dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
    // Optional: Base Path to pass at the command line
    // Takes precedence over other basePaths
    // Default: null
    basePath: '',
    ignoreErrors: true // Options (default: false): Grunt task returns successful even if there are errors in the dojo build
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Blaine Bublitz
Licensed under the MIT license.
