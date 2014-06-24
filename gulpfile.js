var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

var lrServer;

var paths = {
  frontEnd: [
              'app/data/**/*.yaml', 
              'app/views/**/*.jade',
              'app/controllers/**/*.js',
              'app/scripts/**/*.js'
            ]
}


gulp.task('develop', function () {
  nodemon({ script: 'server.js', ext: 'html js', ignore: ['ignored.js'] })
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