'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let syncy = require('syncy');
let cleanCSS = require('gulp-clean-css');

// mise à jour des fichiers spécifiques provenant de node_modules
gulp.task('sync-jquery', (done) => {
    syncy(['node_modules/jquery/dist/*.js'], 'js/', {
        verbose: true,
        updateAndDelete: false,
        base: 'node_modules/jquery/dist/'
    })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
});

gulp.task('sync-fa', (done) => {
    syncy(['node_modules/font-awesome/fonts/**'], 'fonts/', {
        verbose: true,
        base: 'node_modules/font-awesome/fonts/'
    })
    .then(() => {
        done();
    })
    .catch((err) => {
        done(err);
    });
});

// popup : sass -> css -> min
gulp.task('sass-popup', function () {
    return gulp.src('./scss/popup.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('popup.css'))
        .pipe(gulp.dest('./app'))
        .on('end', function () {
            return gulp.src('./app/popup.css')
                .pipe(cleanCSS())
                .pipe(rename('popup-min.css'))
                .pipe(gulp.dest('./app'));
        });
});

// watch
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass-popup']);
});

gulp.task('default', ['sync-jquery', 'sync-fa', 'sass-popup', 'watch']);
