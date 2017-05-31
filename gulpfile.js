'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	sassLint = require('gulp-sass-lint'),
	watch = require('gulp-watch'),
	gulpCopy = require('gulp-copy'),
	newer = require('gulp-newer'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass',
	function() {
		gulp.src('./scss/**/*.scss')
			.pipe(
				sass(
					{
						//includePaths: require('node-bourbon').includePaths,
						includePaths: require('node-neat').includePaths,
						outputStyle: 'expanded'
					}
				)
			)
			.pipe(gulp.dest('./release/css')
			.on('error', sass.logError)
		);
	}
);

gulp.task('autoprefixer',
	() =>
		gulp.src('./release/css/**/*.css')
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}
		)
	)
	.pipe(gulp.dest('./release/css/'))
);

gulp.task('sass:lint',
	function () {
		return gulp.src(
			[
				'./scss/**/*.scss',
				'!./scss/_mixins.scss'
			]
		)
		.pipe(
			sassLint(
				{
					configFile: '.sass-lint.yml'
				}
			)
		)
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
	}
);

gulp.task('watch',
	function() {
		gulp.watch('./scss/**/*.scss', ['sass:lint','sass']);
		//The following line is for when you need to watch html files
		//gulp.watch('./source/**/*.html', ['copyHTML']);
	}
);

gulp.task('concatjs',
	function() {
		return gulp.src('')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./js'));
	}
);

gulp.task('concatcss',
	function() {
		return gulp.src(ampconfig.build.concat.css)
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./release/css'));
	}
);

gulp.task('copy',
	function() {
		return gulp.src('./index.html')
		.pipe(gulp.dest('./release'));
	}
);

gulp.task('clean',
	function () {
		return gulp.src(['./css','./js'], {read: false})
		.pipe(clean());
	}
);

gulp.task('build:css', ['sass:lint','sass','autoprefixer']);

//this is how to assign multiple tasks to a single task
gulp.task('default', ['build:css','copy']);
