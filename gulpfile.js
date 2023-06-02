//CSS y SASS
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

//IMAGES OPTIMIZATION
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function compileScssToCss(done) {
  //identificando archivo
  //compilando scss
  //creando archivo css en dist
  gulp
    .src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/css"));
  done();
}

function avifVersion(done) {
  gulp
    .src("src/img/**/*.{png,jpg}")
    .pipe(avif())
    .pipe(gulp.dest("dist/avif-version"));

  done();
}

function webpVersion(done) {
  gulp
    .src("src/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("dist/webp-version"));

  done();
}

function images(done) {
  const options = {
    quality: 50,
  };

  gulp
    .src("src/img/**/*")
    .pipe(imagemin({ optimaztionLevel: 3 }))
    .pipe(gulp.dest("dist/img"));

  done();
}

function dev() {
  gulp.watch("src/scss/**/*.scss", compileScssToCss);
  gulp.watch("src/img/**/*", images);
}

exports.compileScssToCss = compileScssToCss;
exports.dev = dev;
exports.images = images;
exports.webp = webpVersion;
exports.avif = avifVersion;

exports.default = gulp.series(
  images,
  webpVersion,
  avifVersion,
  compileScssToCss,
  dev
);

//POSTCSS y AUTOPREFIXER - Ambos nos sirven para exactamente usar las ultimas caracteristicas de css con la ventaja de que si hay un navegador que no las soporta
//lo transforma a codigo compatible con ese navegador.

//Tareas por defecto: Las tareas por defecto son las que se ejecutan sin tener que especificar el nombre de la tarea al ejecutar 'gulp' en la terminal
// series - Inicia una tarea y cuando esta finaliza se inicializa la siguiente
// parallel - Todas las tareas se inician al mismo tiempo
