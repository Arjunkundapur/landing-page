
var gulp            = require('gulp');
var gulpFilter      = require('gulp-filter')
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var jade            = require('gulp-jade');
var ts              = require('gulp-typescript');
var mainBowerFiles  = require('gulp-main-bower-files');
var bourbon         = require('node-bourbon');
var uglify          = require('gulp-uglify');

var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');
var debug           = require('gulp-debug');
var connect         = require('gulp-connect');

var appFolder       = 'app';
var distFolder      = 'dist';

var settings = {
    bower: {
        src: './bower.json'
    },
    scripts: {
        src: appFolder + '/typescripts/**/*.ts',
        out: 'main.js',
        dest: distFolder + '/js/',
        vendor: 'vendor.js',
        tsProject: ts.createProject( {
            declaration: true,
            noExternalResolve: true,
            target: 'ES5',
        } )
    },
    styles  : {
        src  : appFolder + '/styles/**/*.scss',
        dest : distFolder + '/css/',
    },
    views   : {
        src  : appFolder + '/views/**/*.jade',
        dest : distFolder + '/'
    },
};

gulp.task( 'webserver', function() {

    connect.server( {
        root: distFolder,
        livereload: true,
        directoryListing: true
    } );
});
 
gulp.task( 'main-bower-files', function() {

    return gulp.src( settings.bower.src )
        .pipe( mainBowerFiles() )
        .pipe( concat( settings.scripts.vendor ))
        .pipe( uglify() )
        .pipe( gulp.dest( settings.scripts.dest) );
});

gulp.task( 'scripts', function () {
    
    var tsResult = gulp.src( settings.scripts.src )
        .pipe( sourcemaps.init() )
        .pipe( ts( settings.scripts.tsProject ));
 
    return tsResult
         .pipe( concat( settings.scripts.out ))
         .pipe( uglify() ) 
         .pipe( sourcemaps.write() ) 
         .pipe( gulp.dest( settings.scripts.dest ))
         .pipe( connect.reload() );
});

gulp.task( 'styles', function () {

    return gulp.src( settings.styles.src )
        .pipe( sourcemaps.init() )
        .pipe( sass( { includePaths: require( 'node-bourbon' ).includePaths } ))
        .pipe( sass().on( 'error', sass.logError) )
        .pipe( sass( { outputStyle: 'compressed' } ))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( settings.styles.dest ))
        .pipe( connect.reload() );
});

gulp.task( 'views', function() {

    return gulp.src( settings.views.src )
        .pipe( jade( { pretty: false } ))
        .pipe( gulp.dest( settings.views.dest ))
        .pipe( connect.reload() );
});

gulp.task( 'watch', function () {

    gulp.watch( settings.views.src, [ 'views' ] );
    gulp.watch( settings.styles.src, [ 'styles' ] );
    gulp.watch( settings.scripts.src, [ 'scripts' ] );
});

gulp.task( 'default', [
        'main-bower-files', 
        'scripts', 
        'styles', 
        'views', 
        'webserver', 
        'watch'
    ] );
