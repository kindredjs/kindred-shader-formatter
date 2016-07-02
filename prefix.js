var inject = require('glsl-token-inject-block')
var stringify = require('glsl-token-string')
var tokenize = require('glsl-tokenizer')

module.exports = applyPrefixToShader
module.exports.source = createPrefixSource

function applyPrefixToShader (source, params) {
  var tokens = tokenize(source)
  var prefix = typeof params !== 'string'
    ? createPrefixSource(params)
    : params

  return stringify(inject(tokens, tokenize(prefix)))
}

function createPrefixSource (params) {
  if (!params) return ''

  var values = []

  for (var key in params) {
    if (!params.hasOwnProperty(key)) continue

    var value = params[key]

    if (typeof value === 'undefined') {
      continue
    }

    if (typeof value === 'boolean') {
      values.push('#define ' + key + ' ' + value)
      continue
    }

    if (typeof value === 'number') {
      values.push('#define ' + key + ' ' + Math.floor(value))
      continue
    }

    if (Array.isArray(value)) {
      if (value.length === 1) {
        values.push('#define ' + key + ' ' + toFloat(value[0]))
        continue
      }
      if (value.length >= 2 && value.length <= 4) {
        values.push('#define ' + key + ' ' + 'vec' + value.length + '(' + value.map(toFloat).join(', ') + ')')
        continue
      }
    }

    throw new Error('Unable to handle shader parameter "' + key + '": must be either a number or array of 1-4 values')
  }

  return values.join('\n')
}

function toFloat (num) {
  var str = String(num)

  return str.indexOf('.') === -1
    ? str + '.0'
    : str
}
