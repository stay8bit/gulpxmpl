'use strict';

//npm update gulp -g

const
	gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	cssnano = require('gulp-cssnano');


// browser-sync
gulp.task('server', function () {
	browserSync.init({
		server: 'build/'
	});

	browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

// css
gulp.task('styles', function () {
	return gulp.src('src/css/*.css')
		.pipe(concatCss("styles.min.css"))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('build/css/'));
});

// images
gulp.task('img', function () {
	return gulp.src('src/images/*.*')
		.pipe(gulp.dest('build/images/'));
});

// js
gulp.task('js', function () {
	return gulp.src('src/script/*.js')
		.pipe(gulp.dest('build/script/'));
});

// html
gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('build/'));
});

// watcher
gulp.task('watch', function () {
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/css/*.css', ['styles']);
	gulp.watch('src/script/*.js', ['js']);
	gulp.watch('src/images/*.*', ['img']);
});

// default task
gulp.task('default', ['html', 'styles', 'js', 'img', 'server', 'watch']);