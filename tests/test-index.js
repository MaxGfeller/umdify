var fs = require('fs')
var test = require('tap').test
var umdify = require('../')

test('basic', function(t) {
  umdify(__dirname + '/../', __dirname + '/tmp', function(err) {
    t.ok(fs.existsSync(__dirname + '/tmp/concat-stream.js'))
    t.ok(fs.existsSync(__dirname + '/tmp/tap.js'))
    t.notOk(err)
    t.end()
  })
})
