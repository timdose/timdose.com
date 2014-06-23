var gulp = require('gulp');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;

var paths = {
  frontEnd: [
              'app/data/**/*.yaml', 
              'app/views/**/*.jade',
              'app/controllers/**/*.js',
              'app/scripts/**/*.js'
            ]
}

gulp.task('server', function() {
  console.log('Starting Express server.');
  var PIPE = {stdio: 'inherit'};
  var cmd = spawn('node', 'server.js', PIPE);

  cmd.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  cmd.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  cmd.on('close', function(code) {
    console.log('express exited with code ' + code );
  });
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.frontEnd).on('change', livereload.changed );
});


gulp.task('serve', ['server', 'watch']);