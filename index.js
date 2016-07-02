var removeAttributes = require('./remove-attributes')
var includePrecision = require('./include-precision')
var removeFunction = require('./remove-function')
var removeUnused = require('./remove-unused')
var createPrefix = require('./prefix')

exports.vert = require('./vert')
exports.frag = require('./frag')
exports.prefix = require('./prefix')

function convert (src, params) {
  var prefix = createPrefix(params)

  return {
    vert: prefix + isolateVert(src),
    frag: prefix + isolateFrag(src)
  }
}
