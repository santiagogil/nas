var shoe = require('shoe');
var meSpeak = require('mespeak');
var Writable = require('stream').Writable
var ws = Writable()
var log = Writable()
var langs = {
  es: require('mespeak/voices/es-la.json'),
  en: require('mespeak/voices/en/en.json'),
  de: require('mespeak/voices/de.json'),
  fr: require('mespeak/voices/fr.json'),
  it: require('mespeak/voices/it.json')
}
meSpeak.loadConfig(require('mespeak/src/mespeak_config.json'));


log._write = function (chunk, enc, next) {
  var data = chunk.toString().split(',')
  console.log('mensaje: ' + data[0].toString() + ' lang:  '  + data[1])
  next()
}

ws._write = function (chunk, enc, next) {
  var data = chunk.toString().split(',')
  meSpeak.loadVoice(langs[data[1]], speak)
  function speak (loaded, voice) {meSpeak.speak(' ' + data[0].toString(), {voice: voice}, cb)
  function cb () { return next() }
  }
}
var sock = shoe('/nas');

sock.pipe(ws)
sock.pipe(log)
