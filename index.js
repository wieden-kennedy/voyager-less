var csso = require('gulp-csso')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber');

module.exports = function (voyager) {
  
  voyager.task('write', 'styles', function (done) {
    this.src('stylesheets/main.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(this.out('stylesheets'))
      .on('end', done);
  });

  voyager.task('write', 'styles-vendor', function (done) {
    this.src('stylesheets/vendor/**')
      .pipe(this.out('stylesheets/vendor'))
      .on('end', done);
  });

  voyager.task('build', 'styles', function (done) {
    this.src(['stylesheets/**/*.css', '!stylesheets/vendor/**'])
      .pipe(csso())
      .pipe(this.out('stylesheets'))
      .on('end', done);
  });

  voyager.task('build', 'styles-vendor', function (done) {
    this.src('stylesheets/vendor/**')
      .pipe(this.out('stylesheets/vendor'))
      .on('end', done);
  });

  voyager.cancelWatch('stylesheets/**/*.css');
  voyager.watch(['stylesheets/**/*.less', '!stylesheets/vendor/**'], 'styles');
};
