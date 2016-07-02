var includePrecision = require('./include-precision')
var removeFunction = require('./remove-function')
var removeUnused = require('./remove-unused')

module.exports = function kindredVertexShaderFormat (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { vert(); }'
  src = removeFunction(src, 'frag')
  src = removeUnused(src, { keep: 'vert' })
  return src
}
