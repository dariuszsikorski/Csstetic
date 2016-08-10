var gulp = require('gulp');
var clean = require('gulp-clean'); // Removes files and folders.
var concat = require('gulp-concat-util'); // concat framework files
var splitfile = require('splitfile'); // split source files
var watch = require('gulp-watch'); // watch for file changes
var vinylPaths = require('vinyl-paths'); // vinyl paths allow to split file during pipeline
var fs = require('fs'); // filesystem for walking through framework folders
var runSequence = require('run-sequence'); // run gulp tasks in sequence
var rename = require('gulp-rename'); // used to remove full directory while moving files
var replace = require('gulp-replace'); // replace text in files, used to fix :code sections
var change = require('gulp-change'); // change the stream - used to add header and new-spaces in demo jades


// --------------------------------------------------
// this file is imported by gulpfile.js
// paths are relative to gulpfile.js

var version = "1.0.0"

var paths = {
  frameworkSources:    '../_framework/**/*.source',
  frameworkJade:       '../_framework/**/*_section.jade',
  frameworkConcatJade: '../_framework/*.jade',
  frameworkScss:       '../_framework/**/*.scss',
  frameworkAllfiles:   '../_framework/**/*.*',
  frameworkFolder:     '../_framework',

  frameworkSemantic:   '../_framework/**/*_semantic.scss',
  frameworkSelectors:  '../_framework/**/*_selectors.scss',
  frameworkDemoScss:   '../_framework/**/*_demo.scss',
  frameworkDemoJade:   '../_framework/**/*_demo.jade',
  frameworkDemoFiles:  '../_framework/**/*_demo.*',
  frameworkSectionScss:'../_framework/**/*_section.scss',

  assetsFolder:        '../assets',
  assetsAllCssFiles:   '../assets/css/**/*.*',
  assetsScssParts:     '../assets/css/parts/**/*.*',
  assetsScssDemos:     '../assets/css/demos/**/*.*',
  assetsScssFolder:    '../assets/css',
  assetsAllJsFiles:    '../assets/js/**/*.*',
  assetsJsFolder:      '../assets/js',
  assetsJsParts:       '../assets/js/parts/**/*.*',
  assetsJsPlugins:     '../assets/js/plugins/**/*.*',
  preprosConfigs:      '../**/prepros.cfg',

  assetsStylesFile:    '../assets/css/style.scss',
  assetsPluginsFile:   '../assets/js/plugins.js',
  assetsScriptsFile:   '../assets/js/scripts.js',

  frameworkSaveSemantic: '_csstetic-semantic.scss',
  frameworkSaveSelectors:'csstetic.scss',
  frameworkSaveSections: 'sections.scss',
  demosFolder:           '../demos',
  demosFiles:            '../demos/*',
  selectorsImportCssfw:  './_csstetic-semantic.scss'
};


// --------------------------------------------------
// helper function, convert path to file name

var pathToFilename = function(path){
  // path = path.replace(/\*/gi,"");
  // return /[^/]*$/.exec(path)[0];
  return path.replace(/^.*[\\\/]/, '');
}

// --------------------------------------------------
// clean framework output files

gulp.task('clean', function(){
  // console.log("cleaning folders finished");
  return gulp.src([
      paths.frameworkAllfiles, // clean framework
      '!' + paths.frameworkSources,
      paths.assetsAllCssFiles, // clean css assets
      '!' + paths.assetsScssParts,
      paths.assetsAllJsFiles,  // clean js assets
      '!' + paths.assetsJsParts,
      '!' + paths.assetsJsPlugins,
      '!' + paths.preprosConfigs,
      '!' + paths.assetsScssDemos,
      paths.demosFiles
    ], {read: false})
    .pipe(clean({force: true}));
});

// --------------------------------------------------
// split source files

gulp.task('splitfiles', function(){

  return gulp.src(paths.frameworkSources)
    .pipe(vinylPaths(function(paths) {
      splitfile(paths);
      return Promise.resolve();
    }));
  // console.log("splitting files finished");

});


// --------------------------------------------------
// copy demo scss

gulp.task('copyDemoScss', function(){
   return gulp.src([paths.frameworkDemoScss])
   .pipe(rename({dirname: ''}))
   .pipe(gulp.dest(paths.demosFolder));
});



// --------------------------------------------------
// copy demo scss
// and modify it's content to be full independent html template

gulp.task('copyDemoJades', function(){
  return gulp.src([paths.frameworkDemoJade])
  .pipe(rename({dirname: ''}))
  .pipe(change(function(content, done){

    result = "extends ../docs/_demo_layout\n\n" + content;

    done(null, result);
  }))
  .pipe(gulp.dest(paths.demosFolder));
});


// --------------------------------------------------
// concat semantic scss

gulp.task('concatSemanticScss', function(){

  return gulp.src([paths.frameworkSemantic])
    .pipe(concat(paths.frameworkSaveSemantic, {
      process: function(src, filePath){
        // var result = src.filename + "\n" + src; // example of filename usage
        var fileName = pathToFilename(filePath).replace(".scss", "");
            fileName = fileName.replace("_semantic", "").replace("_", "");
        var fileSeparator = function(){
          var separator = "";
          for( i=0; i < fileName.length+15; i++ ){ separator += "="; }
          return separator;
        }
        var result = "\n\n// " + fileSeparator() + "\n";
            result += "//    semantic " + fileName + "\n";
            result += "// " + fileSeparator() + "\n\n"
            result += src;
        return result;
      }
    }))
    .pipe(concat.header(
      '// Cssteic Semantic - version ' + version +
      '\n// Documentation http://prettyminimal.com/csstetic'
    ))
    .pipe(gulp.dest(paths.frameworkFolder));
});



// --------------------------------------------------
// concat semantic scss

gulp.task('concatSelectors', function(){

  return gulp.src([paths.frameworkSelectors])
    .pipe(concat(paths.frameworkSaveSelectors, {
      process: function(src, filePath){
        // var result = src.filename + "\n" + src; // example of filename usage
        var fileName = pathToFilename(filePath).replace(".scss", "");
            fileName = fileName.replace("_selectors", " selectors").replace("_", "");
        var fileSeparator = function(){
          var separator = "";
          for( i=0; i < fileName.length+6; i++ ){ separator += "="; }
          return separator;
        }
        var result = "\n\n// " + fileSeparator() + "\n";
            result += "//    " + fileName + "\n";
            result += "// " + fileSeparator() + "\n\n"
            result += src;
        return result;
      }
    }))
    .pipe(concat.header(
      '// Cssteic Classic - version ' + version +
      '\n// Documentation: http://prettyminimal.com/csstetic' +
      "\n\n" +
      '@import "'+ paths.selectorsImportCssfw +'";'
    ))
    .pipe(gulp.dest(paths.frameworkFolder));

});



// --------------------------------------------------
// concat semantic scss

gulp.task('concatSectionStyles', function(){

  return gulp.src([paths.frameworkSectionScss])
    .pipe(concat(paths.frameworkSaveSections))
    .pipe(gulp.dest(paths.frameworkFolder));

});

// --------------------------------------------------
// concat jade files to main framework directory

gulp.task('concatJades', function(){
  // console.log("concat jades called");
  return fs.readdir(paths.frameworkFolder, function(err, items) {
    for (var i=0; i<items.length; i++) {
      // console.log(items[i]);
      var groupFolder = paths.frameworkFolder + "/" + items[i];
      var groupJades = groupFolder + "/**/*.jade";
      var groupOutputFile = items[i].substr(items[i].indexOf("_")+1) + ".jade";
      var groupOutputFolder = paths.frameworkFolder;
      gulp.src([groupJades, "!" + paths.frameworkDemoJade])
        .pipe(concat(groupOutputFile))
        .pipe(gulp.dest(groupOutputFolder));
    }
  });
});

// --------------------------------------------------
// concat scss assets

gulp.task('concatScssAssets', function(){
  return gulp.src([paths.assetsScssParts])
  .pipe(concat('style.scss'))
  .pipe(gulp.dest(paths.assetsScssFolder));
});

// --------------------------------------------------
// concat js plugins

gulp.task('concatJsPlugins', function(){
  return gulp.src([paths.assetsJsPlugins])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest(paths.assetsJsFolder));
});

// --------------------------------------------------
// concat js files

gulp.task('concatJsParts', function(){
  return gulp.src([paths.assetsJsParts])
  .pipe(concat('scripts.js', {
    process: function(src, filePath){
      // var result = src.filename + "\n" + src; // example of filename usage
      var result = "\n/* ========================================================================\n";
          result += " * " + pathToFilename(filePath).substr(4).replace(".js", "") + "\n";
          result += " * ======================================================================== */\n\n\n"
          result += src;
      return result;
    }
  }))
  .pipe(gulp.dest(paths.assetsJsFolder));
});

// --------------------------------------------------
// re-trigger file save on some files, to force prepros recompile


gulp.task('reSaveStyle', function(){
  return gulp.src(['../assets/css/style.scss'])
  .pipe(concat('style.scss'))
  .pipe(gulp.dest('../assets/css/'));
});

gulp.task('reSavePlugins', function(){
  return gulp.src(['../assets/js/plugins.js'])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('../assets/js/'));
});

gulp.task('reSaveScripts', function(){
  return gulp.src(['../assets/js/scripts.js'])
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('../assets/js/'));
});

gulp.task('reSaveJade', function(){
  return gulp.src(['../docs/index.jade'])
  .pipe(concat('index.jade'))
  .pipe(gulp.dest('../docs/'));
});

gulp.task('reSaveDemos', function(){
  return gulp.src([paths.demosFiles])
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest(paths.demosFolder));
});

gulp.task('reSaveDemoAsset', function(){
  return gulp.src(['../assets/css/demos/demo.scss'])
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('../assets/css/demos'));
});

// --------------------------------------------------
// watch task watches source files and split

gulp.task('watch', function () {
  // you can put more watchers here if you need

  // split file for all framework sources watch
  gulp.watch(paths.frameworkSources, function(event){
    console.log(event.type + ": " + pathToFilename(event.path));
    // compile currently changed source file
    if(event.type == 'changed' || event.type == 'added'){
      splitfile(event.path);
    }
  });

  // concat jades every .jade change
  setTimeout(function(){

    gulp.watch([paths.frameworkJade, "!" + paths.frameworkConcatJade], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      runSequence('concatJades', 'reSaveJade');
    });

    gulp.watch([paths.assetsScssParts], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('concatScssAssets');
    });

    gulp.watch([paths.assetsJsParts], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('concatJsParts');
    });

    gulp.watch([paths.assetsJsPlugins], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('concatJsPlugins');
    });

    gulp.watch([paths.frameworkDemoScss], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('copyDemoScss');
    });

    gulp.watch([paths.frameworkDemoJade], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('copyDemoJades');
    });

    gulp.watch([paths.frameworkDemoFiles], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      runSequence(
        'copyDemoScss',
        'copyDemoJades',
        'reSaveDemoAsset'
      );
    });

    gulp.watch([paths.frameworkSemantic], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      runSequence(
        'concatSemanticScss',
        'concatScssAssets'
      );
    });

    gulp.watch([paths.frameworkSelectors], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      runSequence(
        'concatSelectors',
        'concatScssAssets'
      );
    });

    gulp.watch([paths.frameworkSectionScss], function(event){
      console.log(event.type + ": " + pathToFilename(event.path));
      gulp.start('concatSectionStyles');
      runSequence(
        'concatSectionStyles',
        'reSaveStyle'
      );
    });

  }, 1000);


  // console.log("watch task finished");
});

// --------------------------------------------------
// concat jade files to main framework directory
// replace ":code" in output *.jade files with commented "//- :code"

gulp.task('concatJadesWithCodefix', function(){
  // console.log("concat jades called");
  return fs.readdir(paths.frameworkFolder, function(err, items) {
    setTimeout(function(){
      for (var i=0; i<items.length; i++) {
        // console.log(items[i]);
        var groupFolder = paths.frameworkFolder + "/" + items[i];
        var groupJades = groupFolder + "/**/*.jade";
        var groupOutputFile = items[i].substr(items[i].indexOf("_")+1) + ".jade";
        var groupOutputFolder = paths.frameworkFolder;
        gulp.src([groupJades])
          .pipe(concat(groupOutputFile))
          .pipe(replace(':code', '//- :code'))
          .pipe(gulp.dest(groupOutputFolder));
      }
    }, 5000);
  });
});

// --------------------------------------------------
// build task calls clean then strip

gulp.task('build', function(){
  // console.log("build task finished");
  runSequence(
    'clean',
    'splitfiles'
  );
  setTimeout(function(){
    // this must run After splitfiles
    runSequence(
      'concatJades',
      'concatJsParts',
      'concatJsPlugins',
      'concatScssAssets',
      'copyDemoScss',
      'copyDemoJades',
      'concatSemanticScss',
      'concatSelectors',
      'concatSectionStyles'
    );
  }, 1000);

  setTimeout(function(){
    runSequence(
      'reSaveJade',
      'reSaveScripts',
      'reSavePlugins',
      'reSaveStyle',
      'reSaveDemos',
      'reSaveDemoAsset'
    );
  }, 2000);

});

// --------------------------------------------------
// start task calls build then watch

gulp.task('start', function(callback) {
  return runSequence('build', 'watch');
});

gulp.task('start-codefix', function(callback) {
  return runSequence('build', 'concatJadesWithCodefix');
});

// --------------------------------------------------