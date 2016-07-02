var includePrecision = require('./include-precision')
var removeUnused = require('./remove-unused')

module.exports = function kindredVertexShaderFormat (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { vert(); }'
  src = removeUnused(src, { keep: 'vert' })
  return src
}
