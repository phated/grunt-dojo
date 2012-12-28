# grunt-dojo

Build Dojo inside a Grunt task

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
    dojo: 'path/to/dojo.js', // Path to dojo.js file in dojo source
    load: 'build', // Optional: Utility to bootstrap (Default: 'build')
    profile: 'app.profile.js', // Profile for build
    cwd: './' // Directory to execute build within
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Blaine Bublitz
Licensed under the MIT license.
