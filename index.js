var applyPrefix = require('./prefix')
var convertVert = require('./vert')
var convertFrag = require('./frag')

module.exports = format
module.exports.vert = convertVert
module.exports.frag = convertFrag
module.exports.prefix = applyPrefix

function format (src, params) {
  var prefix = applyPrefix.source(params)

  return {
    vert: applyPrefix(convertVert(src), prefix),
    frag: applyPrefix(convertFrag(src), prefix)
  }
}
