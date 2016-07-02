var removeAttributes = require('./remove-attributes')
var includePrecision = require('./include-precision')
var removeFunction = require('./remove-function')
var removeUnused = require('./remove-unused')

module.exports = function kindredFragmentShaderFormat (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { frag(); }'
  src = removeAttributes(src)
  src = removeFunction(src, 'vert')
  src = removeUnused(src, { keep: 'frag' })
  return src
}
