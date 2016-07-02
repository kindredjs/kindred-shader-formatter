var removeAttributes = require('./remove-attributes')
var includePrecision = require('./include-precision')
var removeUnused = require('./remove-unused')

module.exports = function kindredFragmentShaderFormat (src, params) {
  src = includePrecision(src)
  src += '\nvoid main () { frag(); }'
  src = removeAttributes(src)
  src = removeUnused(src, { keep: 'frag' })
  return src
}
