var gulp = require('gulp');
const $ = require('gulp-load-plugins')();
// var jade = require('gulp-jade');
var sass = require('gulp-sass')(require('sass'));
// var plumber = require('gulp-plumber');
// var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')


gulp.task('copyHTML', function(){
  return gulp.src('./source/**/*.html')
    .pipe(gulp.dest('./public/'))
});


// Jade
gulp.task('jade', async function() {
  // var YOUR_LOCALS = {};
 
  gulp.src('./source/**/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      // locals: YOUR_LOCALS
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
});


// SASS
// compile - gulp 4 陳述式寫法
gulp.task('style', async function(){
  gulp.src('./source/scss/**/*.scss')
    // plumber
    .pipe($.plumber())
    // sourcemap頭 - 在編譯之前
    .pipe($.sourcemaps.init())

    .pipe(sass.sync().on('error', sass.logError))
    // 到此編譯完成

    // postcss
    .pipe($.postcss([autoprefixer()]))

    // sourcemap尾 - 放在最後輸出之前
    .pipe($.sourcemaps.write('.'))

    .pipe(gulp.dest('./public/css'));
});

// gulp 4 表達式寫法
// function style() {
//   return gulp.src('./source/scss/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./public/css'));
// };
// exports.style = style;


// Babel 
gulp.task('babel', () =>
    gulp.src('./source/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
);


// watch - gulp 4 陳述式寫法
gulp.task('watch', async function () {
  gulp.watch('./source/scss/**/*.scss', gulp.series('style'));
  gulp.watch('./source/*.jade', gulp.series('jade'));
  gulp.watch('./source/js/**/*.js', gulp.series('babel'));
});

// gulp 4 表達式寫法
// exports.watch = function () {
//   gulp.watch('./source/scss/**/*.scss', gulp.series('style'));
// };


gulp.task('default', gulp.series('jade', 'style', 'babel', 'watch'));
