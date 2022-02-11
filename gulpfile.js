/**
 * Gulpfile.
 *
 * Implements:
 *      1. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification.
 *      2. JS: Concatenates & uglifies Vendor and Custom JS files.`
 *      3. Images : Image minification
 *      4. Fonts : Copy
 *      4. Watches files for changes in CSS, JS or Images.
 *
 * @author Cédric Andrietti
 * @version 1.0.0
 */

/**
 * Configuration.
 */

// NPM directory
var npmDir = './node_modules';

// Style Vendor related.
var styleVendorSRC = [ // Path to Vendor CSS files
    //npmDir + '/your-vendor-file.css',
    './src/css/lib/*.css'
];
var styleVendorDestination = './dist/css/'; // Path to place the compiled CSS file.
var styleVendorFile = 'vendors'; // Compiled CSS file name.

// Style Custom related.
var styleSRC = './src/sass/main.scss'; // Path to SCSS files
var styleDestination = './dist/css/'; // Path to place the compiled CSS file.
var styleMainFile = 'custom'; // Compiled CSS file name.

// JS Vendor related.
var jsVendorSRC = [ // Path to JS vendor files
	npmDir + '/jquery/dist/jquery.js',
    './src/js/lib/*.js'
];
var jsVendorDestination = './dist/js/'; // Path to place the compiled JS vendors file.
var jsVendorFile = 'vendors'; // Compiled JS vendors file name.

// JS Custom related.
var jsCustomSRC = './src/js/*.js'; // Path to JS custom scripts folder.
var jsCustomDestination = './dist/js/'; // Path to place the compiled JS custom scripts file.
var jsCustomFile = 'custom'; // Compiled JS custom file name.

// Images
var imgSrc = './src/img/**/*.{png,jpg,jpeg,gif,ico}'; // Path to source images folder.
var imgDestination = './dist/img/'; // Path to place the optimised images.

// SVG
var svgSrc = './src/img/**/*.svg'; // Path to source svg images folder.
var svgDestination = './dist/img/'; // Path to place the svg optimised images.

// Fonts
var fontsSrc = './src/fonts/**/*.{eot,svg,ttf,woff,woff2}'; // Path to source fonts folder.
var fontsDestination = './dist/fonts/'; // Path to place the fonts.

// HTML
var htmlSrc = './src/**/*' +
	'.html'; // Path to source html files.
var htmlDestination = './dist/'; // Path to place the html.

// Watch files paths.
var styleVendorWatchFiles = './src/css/lib/*.css'; // Path to all vendor CSS files.
var styleWatchFiles = './src/sass/**/*.scss'; // Path to all *.scss files inside css folder and inside them.
var vendorJSWatchFiles = './src/js/lib/*.js'; // Path to all vendor JS files.
var customJSWatchFiles = './src/js/*.js'; // Path to all custom JS files.
var imagesWatchFiles = './src/img/**/*.{png,jpg,jpeg,gif,svg,ico}'; // Path to all images files.
var fontsWatchFiles = './src/fonts/**/*.{eot,svg,ttf,woff,woff2}'; // Path to all fonts files.
var htmlWatchFiles = './src/**/*.html'; // Path to all html files.


const {src, dest, watch, series, parallel} = require('gulp');
const plugins = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

function styles() {
    return src(styleSRC)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassGlob())
        .pipe(sass.sync({
            errLogToConsole: true,
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', plugins.notify.onError({
            message: "<%= error.message %>",
            title: "Error Custom styles"
        })))
        .pipe(plugins.postcss([
            autoprefixer()
        ]))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.concat(styleMainFile + '.css'))
        .pipe(dest(styleDestination))
        .pipe(plugins.rename({
            basename: styleMainFile,
            suffix: '.min'
        }))
        .pipe(plugins.postcss([
            cssnano()
        ]))
        .pipe(dest(styleDestination))
        .pipe(plugins.notify('Custom styles Completed! 💯'))
}

function stylesVendors() {
    return src(styleVendorSRC)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(sass.sync({
            errLogToConsole: true,
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', plugins.notify.onError({
            message: "<%= error.message %>",
            title: "Error Vendors styles"
        })))
        .pipe(plugins.postcss([
            autoprefixer()
        ]))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.concat(styleVendorFile + '.css'))
        .pipe(dest(styleVendorDestination))
        .pipe(plugins.rename({
            basename: styleVendorFile,
            suffix: '.min'
        }))
        .pipe(plugins.postcss([
            cssnano()
        ]))
        .pipe(dest(styleVendorDestination))
        .pipe(plugins.notify('Vendors styles Completed! 💯'))
}

function scripts() {
    var onError = function (err) {
        console.log(err.toString());
        this.emit('end');
    };

    return src(jsCustomSRC)
        .pipe(plugins.plumber())
		.pipe(plugins.jshint({
			esversion: 6
		}))
		.pipe(plugins.jshint.reporter())
        .pipe(plugins.jshint.reporter('fail'))
        .on("error", plugins.notify.onError({
            title: "JSHint Error",
            message: "<%= error.message %>"
        }))
        .pipe(plugins.concat(jsCustomFile + '.js').on('error', onError))
        .pipe(dest(jsCustomDestination))
        .pipe(plugins.rename({
            basename: jsCustomFile,
            suffix: '.min'
        }))
        .pipe(plugins.uglify().on('error', onError))
        .pipe(dest(jsCustomDestination))
        .pipe(plugins.notify('Custom scripts Completed! 💯'))
}

function scriptsVendor() {
    var onError = function (err) {
        console.log(err.toString());
        this.emit('end');
    };

    return src(jsVendorSRC)
        .pipe(plugins.plumber())
        .pipe(plugins.concat(jsVendorFile + '.js').on('error', onError))
        .pipe(dest(jsVendorDestination))
        .pipe(plugins.rename({
            basename: jsVendorFile,
            suffix: '.min'
        }))
        .pipe(plugins.uglify().on('error', onError))
        .pipe(dest(jsVendorDestination))
        .pipe(plugins.notify('Vendors scripts Completed! 💯'))
}

function images() {
    return src(imgSrc)
        .pipe(plugins.imagemin())
        .pipe(dest(imgDestination))
        .pipe(plugins.notify('Images minification Completed! 💯'))
}

function svg() {
	return src(svgSrc)
		.pipe(plugins.svgmin({
			multipass: true,
			js2svg: {
				pretty: false,
				indent: 2,
			},
			plugins: [
				{
					name: 'sortAttrs',
					active: true,
				},
				{
					name: 'removeStyleElement',
					active: true,
				},
				{
					name: 'removeViewBox',
					active: false,
				},
				{
					name: 'removeDimensions',
					active: true,
				},
				{
					name: 'cleanupIDs',
					active: true,
					params: {
						minify: true,
					}
				},
			],
		}))
		.pipe(dest(svgDestination))
		.pipe(plugins.notify('SVG minification Completed! 💯'))
}

function fonts() {
	return src(fontsSrc)
		.pipe(dest(fontsDestination))
		.pipe(plugins.notify('Fonts copy Completed! 💯'))
}

function html() {
	return src(htmlSrc)
		.pipe(plugins.htmlmin({ collapseWhitespace: true }))
		.pipe(dest(htmlDestination))
		.pipe(plugins.notify('HTML minification Completed! 💯'))
}

function cleanDist() {
    return del(['./dist']);
}

function cleanImages() {
	return del(imgDestination);
}

function cleanFonts() {
	return del(fontsDestination);
}

function watchAssets() {
    watch(styleVendorWatchFiles, stylesVendors); // Reload on Vendor CSS file changes.
    watch(styleWatchFiles, styles); // Reload on SCSS file changes.
    watch(vendorJSWatchFiles, scriptsVendor); // Reload on vendorsJs file changes.
    watch(customJSWatchFiles, scripts); // Reload on customJS file changes.
    watch(imagesWatchFiles, series(cleanImages, images, svg)); // Reload on images changes.
    watch(fontsWatchFiles, series(cleanFonts, fonts)); // Reload on fonts changes.
    watch(htmlWatchFiles, html); // Reload on html changes.
}

const build = series(
	cleanDist,
    parallel(styles, stylesVendors, scripts, scriptsVendor, images, fonts, svg, html)
);

const watcher = series(build, watchAssets);

exports.default = build;
exports.watch = watcher;
