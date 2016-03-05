var gulp = require('gulp');
var plumber = require('gulp-plumber'); // エラー時に停止処理をしない
// SERVER
var browser = require('browser-sync');
gulp.task('server', function() {
    browser({
        server: {
            baseDir: './app/public/'
        }
    });
});

// CLEAN
var del = require('del');
gulp.task('clean', function () {
    del(['app/public/']);
});

// SASS
var sass = require('gulp-sass');
gulp.task('sass', function(){
    gulp.src(['./app/source/scss/**/*.scss', '!'+'./app/source/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./app/public/css'))
        .pipe(browser.reload({stream:true}))
});

// MEDIA QUERY
var cmq = require('gulp-combine-media-queries');
gulp.task('cmq', function () {
    gulp.src('./app/public/css/*.css')
        .pipe(plumber())
        .pipe(cmq({
            log: true
        }))
    .pipe(gulp.dest('./app/public/css'));
});

// EJS
var ejs = require('gulp-ejs');
gulp.task('ejs', function() {
    gulp.src(['./app/source/ejs/**/*.ejs','!' + './app/source/ejs/**/_*.ejs'])
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest('./app/public'))
        .pipe(browser.reload({stream:true}))
});

// COPY
gulp.task('copy', function(){
    gulp.src('./app/source/scss/**/*.css').pipe(plumber()).pipe(gulp.dest('./app/public/css/')).pipe(browser.reload({stream:true}));
    gulp.src('./app/source/js/**/*.js').pipe(plumber()).pipe(gulp.dest('./app/public/js')).pipe(browser.reload({stream:true}));
    gulp.src('./app/source/images/**/*.{png,jpg,gif}').pipe(plumber()).pipe(gulp.dest('./app/public/images')).pipe(browser.reload({stream:true}));
    gulp.src('./app/source/images/**/').pipe(plumber()).pipe(gulp.dest('./app/public/images')).pipe(browser.reload({stream:true}));
    gulp.src('./app/source/ejs/**/*.html').pipe(plumber()).pipe(gulp.dest('./app/public/')).pipe(browser.reload({stream:true}));
    gulp.src('./app/source/fonts/**/*.html').pipe(plumber()).pipe(gulp.dest('./app/public/fonts')).pipe(browser.reload({stream:true}));
});

// BUILD
var runSequence = require('run-sequence');  
gulp.task('build', function(callback){
    return runSequence(
        'clean',
        ['ejs', 'sass', 'copy'],
        callback
    );
});

// DEFAULT
gulp.task('default', ['server'], function(){
    gulp.watch('./app/source/scss/**/*.scss', ['sass']);
    gulp.watch('./app/source/css/**/*.css', ['copy']);
    gulp.watch('./app/source/ejs/**/*.ejs', ['ejs']);
    gulp.watch('./app/source/ejs/**/', ['ejs']);
    gulp.watch('./app/source/ejs/**/*.html', ['copy']);
    gulp.watch('./app/source/images/**/*.{png,jpg,gif}', ['copy']);
    gulp.watch('./app/source/js/**/*.js', ['copy']); 
});