var functions = require('glsl-token-functions')
var stringify = require('glsl-token-string')
var tokenize = require('glsl-tokenizer')

module.exports = removeFunction

function removeFunction (src, targetName) {
  var tokens = tokenize(src)
  var fns = functions(tokens)

  for (var i = 0; i < fns.length; i++) {
    var fn = fns[i]
    var name = fn.name
    if (name !== targetName) continue
    var start = fn.outer[0]
    var end = fn.outer[1]

    for (var j = start; j <= end; j++) {
      tokens[j].data = ''
    }
  }

  return stringify(tokens)
}
