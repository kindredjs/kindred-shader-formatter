var removeAttributes = require('./remove-attributes')
var includePrecision = require('./include-precision')
var removeFunction = require('./remove-function')
var removeUnused = require('./remove-unused')
var createPrefix = require('./prefix')

module.exports = convert
module.exports.vert = convertVert
module.exports.frag = convertFrag

function convert (src, params) {
  var prefix = createPrefix(params)

  return {
    vert: prefix + isolateVert(src),
    frag: prefix + isolateFrag(src)
  }
}

function convertVert (src, params) {
  return createPrefix(params) + isolateVert(src)
}

function convertFrag (src, params) {
  return createPrefix(params) + isolateFrag(src)
}

function isolateVert (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { vert(); }'
  src = removeFunction(src, 'frag')
  src = removeUnused(src, { keep: 'vert' })
  return src
}

function isolateFrag (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { frag(); }'
  src = removeAttributes(src)
  src = removeFunction(src, 'vert')
  src = removeUnused(src, { keep: 'frag' })
  return src
}
