var shake = require('glsl-token-function-shaker')
var stringify = require('glsl-token-string')
var tokenize = require('glsl-tokenizer')

module.exports = removeUnused

function removeUnused (src, options) {
  var tokens = tokenize(src)

  shake(tokens, { ignore: options.keep })

  return stringify(tokens)
}
