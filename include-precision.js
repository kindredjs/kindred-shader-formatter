var tokenize = require('glsl-tokenizer')

module.exports = includePrecison

function includePrecison (src) {
  var tokens = tokenize(src)
  var needsPrecision = true

  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'keyword') continue
    if (tokens[i].data !== 'precision') continue
    needsPrecision = false
    break
  }

  return needsPrecision
    ? 'precision highp float;\n' + src
    : src
}
