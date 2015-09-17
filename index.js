var shoe = require('shoe')
var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/static')

var server = http.createServer(ecstatic)
server.listen(9999)

var sock = shoe(function(stream) {
  process.stdin.pipe(stream)
})
sock.install(server, '/nas')
