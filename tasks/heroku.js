
/*
grunt-heroku
https://github.com/tghw/grunt-heroku

Copyriught (c) 2014 Tyler G. Hicks-Wright
Licensed under MIT license.
 */
module.exports = function(grunt) {
  grunt.registerMultiTask('herokudeploy', 'Deploy the specified branch to the specified environment of Heroku.', function() {
    var branch, next, remote;
    next = this.async();
    remote = this.options.remote || 'heroku';
    branch = this.options.branch || 'master';
    return grunt.util.spawn({
      cmd: 'git',
      grunt: false,
      args: ['push', remote, branch]
    }, next);
  });
  grunt.registerMultiTask('herokurun', 'Run a command on Heroku.', function() {
    var args, next;
    next = this.async();
    args = ['run'].concat(this.data.args);
    return grunt.util.spawn({
      cmd: 'heroku',
      grunt: false,
      args: args,
      opts: {
        stdio: 'inherit'
      }
    }, function(error, result, code) {
      if (code === 0) {
        return grunt.log.writeln(result.stdout);
      } else {
        grunt.log.errorlns(error);
        return grunt.log.errorlns(result.stderr);
      }
    });
  });
};