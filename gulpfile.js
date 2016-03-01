var gulp = require('gulp');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('sass:compile', function() {
	return gulp.src('./src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('treeview.css'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('sass:minify', function() {
	return gulp.src('./src/**/*.scss')
		.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
		.pipe(rename('treeview.min.css'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('compile', function() {
	return gulp.src('./src/**/*.js')
		.pipe(ngAnnotate())
		.pipe(rename('treeview.js'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('compile:minify', function() {
	return gulp.src('./src/**/*.js')
		.pipe(ngAnnotate())
		.pipe(minify())
		.pipe(rename('treeview.min.js'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('clean', function() {
	return gulp.src('./dist')
		.pipe(clean())
});

gulp.task('default', ['compile', 'compile:minify', 'sass:compile', 'sass:minify'], function() {

});