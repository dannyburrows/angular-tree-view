var gulp = require('gulp');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
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

gulp.task('compile:uglify', function() {
	return gulp.src('./src/**/*.js')
		.pipe(ngAnnotate())
		.pipe(uglify({
			ext: { src:'*.js', min: '.js'}
		}))
		.pipe(rename('treeview.min.js'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('clean', function() {
	return gulp.src('./dist')
		.pipe(clean())
});

gulp.task('default', ['compile', 'compile:uglify', 'sass:compile', 'sass:minify'], function() {

});