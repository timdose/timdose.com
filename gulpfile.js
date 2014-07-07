var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

var lrServer;

var paths = {
  frontEnd: [
    'app/views/**/*.jade',
    'app/controllers/**/*.js',
    'public/**/*.js',
    'public/**/*.less',
    'public/assets/styles/**/*.css'
  ],
  server: [
    'app/data/**/*.yaml'
  ]
}


gulp.task('develop', function () {
  nodemon({ script: 'server.js', ext: 'html js yaml yml', ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
      setTimeout(function() {
        livereload.changed();
      }, 2000);
    })
})


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.frontEnd).on('change', livereload.changed );
});


gulp.task('serve', ['develop', 'watch']);