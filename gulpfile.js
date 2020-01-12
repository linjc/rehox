const { watch, dest, parallel } = require('gulp')
const ts = require("gulp-typescript")

function hooks() {
  const tsProject = ts.createProject("tsconfig.json")
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(dest('dist'))
}

function listen() {
  watch('src/*', cb => {
    hooks()
    cb()
  })
}

exports.listen = parallel(hooks, listen)
exports.default = hooks