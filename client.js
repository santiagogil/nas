var shoe = require('shoe');
var meSpeak = require('mespeak');
var Writable = require('stream').Writable
var ws = Writable()

ws._write = function (chunk, enc, next) {
  console.log(chunk)
  meSpeak.speak(chunk)
  process.nextTick(function() {next()})
}
meSpeak.loadVoice(require('mespeak/voices/es-la.json'));
meSpeak.loadConfig(require('mespeak/src/mespeak_config.json'));

var sock = shoe('/nas');

// sock.on('data', function (datum) { meSpeak.speak(datum)});
sock.pipe(ws)
