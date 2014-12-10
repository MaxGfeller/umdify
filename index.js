var concat = require('concat-stream')
var browserify = require('browserify')
var fs = require('fs')

module.exports = function(path, dir, cb) {
  if(path.indexOf('node_modules') === -1) path += '/node_modules'

  fs.exists(dir, function(exists) {
    if(!exists) return fs.mkdir(dir, function(err) {
      if(err) return cb(err)
      execute(path, dir, cb)
    })

    execute(path, dir, cb)
  })
}

function execute(path, dir, cb) {
  var total = 0
  fs.readdir(path, function(err, modules) {
    if(err) return cb(err)

    modules.forEach(function(module) {
      if(module === '.bin'
        || module === 'browserify'
        || module === 'umdify')
        return

      total++
      fs.createReadStream(path + '/' + module + '/package.json')
      .pipe(concat(function(contents) {
        try {
          var pack = JSON.parse(contents)
        } catch(e) {
          return cb(e)
        }

        var main = pack.main || 'index.js'
        var name = pack.name

        var b = browserify({ standalone: name })
        b.add(path + '/' + module + '/' + main)
        var target = dir + '/' + name + '.js'
        var ws = fs.createWriteStream(target)
        b.bundle().pipe(ws)
        .on('finish', function() {
          total--
          if(total === 0) return cb(null)
          })
        }))
      })
    })
}
