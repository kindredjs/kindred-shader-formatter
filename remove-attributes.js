var stringify = require('glsl-token-string')
var tokenize = require('glsl-tokenizer')

module.exports = removeAttributes

function removeAttributes (src) {
  var tokens = tokenize(src)
  var attOpen = null

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (attOpen === null) {
      if (token.type !== 'keyword') continue
      if (token.data !== 'attribute') continue
      attOpen = i
    }

    if (token.data !== ';') {
      token.data = ''
      continue
    }

    token.data = ''
    attOpen = null

    var next = tokens[i + 1]
    if (!next) break

    if (next.type === 'whitespace') {
      next.data = ''
      i++
    }
  }

  return stringify(tokens)
}
