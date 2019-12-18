const { src, watch, dest, parallel } = require('gulp')
const babel = require('gulp-babel')

function hooks() {
  return src('src/index.js')
    .pipe(babel({
      presets: ['@babel/env','@babel/preset-react']
    }))
    .pipe(dest('dist'))
}

function listen() {
  watch('src/index.js', cb => {
    hooks()
    cb()
  })
}
exports.listen = parallel(hooks, listen)
exports.hooks = hooks
exports.default = hooks