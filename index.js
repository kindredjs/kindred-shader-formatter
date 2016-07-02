var convertVert = require('./vert')
var convertFrag = require('./frag')

module.exports = format
module.exports.vert = convertVert
module.exports.frag = convertFrag

function format (src) {
  return {
    vert: convertVert(src),
    frag: convertFrag(src)
  }
}
