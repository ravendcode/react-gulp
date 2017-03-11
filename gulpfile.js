const path = require('path')
const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const buffer = require('vinyl-buffer')
const gulpif = require('gulp-if')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const connect = require('gulp-connect')
const through2 = require('through2').obj
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const colorfunction = require('postcss-color-function')
const precss = require('precss')
const animation = require('postcss-animation')
// const uglify = require('gulp-uglify')
// const concat = require('gulp-concat')
// const babel = require('gulp-babel')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'
const srcDir = 'client'
const distDir = 'public'
const reactDir = srcDir + '/app'

gutil.log(gutil.colors.yellow('[Env]'), gutil.colors.blue(env))

function error(done) {
  return (err) => {
    if (err) {
      gutil.log(gutil.colors.red('[Error]'), err.stack)
      done()
    }
  }
}

gulp.task('connect', function () {
  connect.server({
    port: 3000,
    // https: true,
    root: distDir,
    livereload: true,
    fallback: path.join(__dirname, distDir + '/index.html')
  })
})

gulp.task('clean', () => {
  return del([distDir + '/**/*'])
})

gulp.task('html', () => {
  return gulp.src(srcDir + '/index.html')
    .pipe(gulp.dest(distDir))
    .pipe(connect.reload())
})

gulp.task('assets', () => {
  return gulp.src(srcDir + '/assets/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(distDir + '/assets'))
    .pipe(connect.reload())
})

gulp.task('jsx', (done) => {
  let options = browserify({
    entries: reactDir + '/index.jsx',
    extensions: ['.js', '.jsx'],
    debug: !isProd,
  })
  return options.transform(babelify)
    .bundle()
    .on('error', error(done))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(isProd, rename({
      suffix: '.min'
    })))
    // .pipe(gulpif(isProd, uglify().on('error', error(done))))
    .pipe(gulp.dest(distDir + '/scripts'))
    .pipe(connect.reload())
})

gulp.task('sass', () => {
  return gulp.src(reactDir + '/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulpif(isProd, rename({
      suffix: '.min'
    })))
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(gulp.dest(distDir + '/styles'))
    .pipe(connect.reload())
})

gulp.task('postcss', (done) => {
  let processors = [
    autoprefixer(),
    colorfunction(),
    precss(),
    animation(),
  ]

  if (isProd) {
    processors.push(cssnano())
  }
  return gulp.src(reactDir + '/styles/app.css')
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', error(done))
    .pipe(gulpif(isProd, rename({
      suffix: '.min'
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir + '/styles'))
    .pipe(connect.reload())
})

gulp.task('html-minify', () => {
  return gulp.src(srcDir + '/index.html')
    .pipe(through2((file, encode, cb) => {
      let html = file.contents.toString()
      html = html.replace(/href="\/styles\/bundle.css"/, 'href="/styles/bundle.min.css"')
      html = html.replace(/src="\/scripts\/bundle.js"/, 'src="/scripts/bundle.min.js"')
      file.contents = Buffer.from(html)
      cb(null, file)
    }))
    .pipe(gulpif(isProd, htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(distDir))
})

gulp.task('watch', ['html', 'assets', 'sass', 'jsx'], () => {
  gulp.watch(srcDir + '/index.html', ['html'])
  gulp.watch(srcDir + '/assets/**/*', ['assets'])
  gulp.watch(reactDir + '/styles/**/*.scss', ['sass'])
  // gulp.watch(reactDir + '/styles/**/*.css', ['postcss'])
  gulp.watch(reactDir + '/**/*.jsx', ['jsx'])
})

if (isProd) {
  gulp.task('default', ['jsx', 'sass', 'html-minify', 'assets'])
} else {
  gulp.task('default', ['connect', 'watch'])
}
