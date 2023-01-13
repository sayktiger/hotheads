const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const rename      = require("gulp-rename");
const autoprefixer= require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const imagemin    = require('gulp-imagemin');
const htmlmin     = require('gulp-htmlmin');
const svgSprite = require('gulp-svg-sprite');
// const imageminWebp = require('imagemin-webp');
// const imageminw = require('imagemin');
// const webp = require('gulp-webp');
const svgspriteConfig = {
    shape: {
        dimension: {
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {
            padding: 0
        },
        transform: [{
            "svgo": {
                "plugins": [
                    { removeViewBox: false },
                            { removeUnusedNS: false },
                            { removeUselessStrokeAndFill: true },
                            { cleanupIDs: true },
                            { removeComments: true },
                            { removeEmptyAttrs: true },
                            { removeEmptyText: true },
                            { collapseGroups: true },
                            { removeAttrs: { attrs: '(fill|stroke|style|id)' } }
                ]
            }
        }]
    },
    mode: {
        symbol: {
            dest : '.',
            sprite: 'sprite.svg'
        }
    }
  };


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }   
    });
    gulp.watch("src/*.html").on("change",browserSync.reload);
});

gulp.task('styles',function(){
    return gulp.src("src/sass/**/*.+(scss|sass)")
            
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest("src/css"))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                cascade: false
             }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});



gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'))
    gulp.watch("src/*.html").on("change",gulp.parallel(`html`));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/img/svgIcons/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task(`html`,function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task(`scripts`,function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task(`fonts`,function(){
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});
gulp.task(`icons`,function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});
gulp.task(`mailer`,function(){
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task(`images`,function(){
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task(`svgSprite`, function(){
    return gulp.src("src/img/svg/*.svg")      
        .pipe(svgSprite(svgspriteConfig)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest("dist/img"));
});

// gulp.task(`webp-min`, ()=>{
//         imageminw(['src/img/**/*.{jpg,png}'], 'dist/', {
//         use: [
//             imageminWebp({quality: 80})
//         ]
//     });
//     return gulp.src('src/**/*.png')
//         .pipe(webp())
//         .pipe(gulp.dest('dist/img'))
// });


gulp.task('default', gulp.parallel('watch','server','styles',`scripts`,`fonts`,`icons`,`html`,`mailer`,`images`,`svgSprite`));