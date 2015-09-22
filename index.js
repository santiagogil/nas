var shoe = require('shoe')
var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/static')
var tr = require('yandex-translate')('trnsl.1.1.20150918T221751Z.720a41963ee12318.6000ac0baa6b918e812737129e723190d984d4de')
var ms = require('map-stream')

var translate = ms(function (data, callback) {
  if (!data) callback()
  data = data.toString().slice(0, -1).split('  ')
  if (!data[1]) callback(null, [data[0], 'es'].toString())
  tr.translate(data[0], {from: 'es', to: data[1]}, function (err, res) {
    if (err) return callback(err)
    callback(null, [res.text, data[1]].toString())
  })
})

var translated = process.stdin.pipe(translate)


var server = http.createServer(ecstatic)
server.listen(9999)

var sock = shoe(function(stream) {
  translated.pipe(stream)
})
sock.install(server, '/nas')
