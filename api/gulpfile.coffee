apidoc = require "gulp-apidoc"
coffee = require "gulp-coffee"
del = require "del"
gulp = require "gulp"
fs = require "fs"
nodemon = require "nodemon"
path = require "path"
runSequence = require "run-sequence"
source = require "vinyl-source-stream"

gulp.task "server", () ->
  return gulp.src "./src/*.coffee"
    .pipe coffee()
    .pipe gulp.dest "./"

gulp.task "lib", () ->
  return gulp.src "./src/lib/*"
    .pipe coffee()
    .pipe gulp.dest "./lib/"

gulp.task "app", () ->
  return gulp.src "./src/app/*"
    .pipe coffee()
    .pipe gulp.dest "./app/"

gulp.task "watch", () ->
  gulp.watch "./src/*.coffee", ["server"]
  gulp.watch "./src/lib/*.coffee", ["lib"]
  gulp.watch "./src/app/*.coffee", ["app"]

gulp.task "nodemon", () ->
  nodemon
    script: "./server.js"
    env:
      NODE_ENV: "development"

gulp.task "del", () ->
  return del.sync [
    "./app"
    "./lib"
    "./*.js"
  ]

gulp.task "build", (done) ->
  return runSequence "del",
  [
    "server"
    "lib"
    "app"
  ]

gulp.task "default", ["watch"], (done) ->
  return runSequence "del",
    [
      "server"
      "lib"
      "app"
    ],
    "nodemon"
