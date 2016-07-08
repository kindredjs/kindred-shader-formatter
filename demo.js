var Editor = require('glsl-editor')
var format = require('./')

var outFrag = Editor({ container: document.querySelector('#out-frag'), readOnly: true })
var outVert = Editor({ container: document.querySelector('#out-vert'), readOnly: true })
var source = Editor({
  container: document.querySelector('#source'),
  value: `

attribute vec2 position;
uniform float time;
varying vec2 uv;

void vert() {
  uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 1, 1);
}

void frag() {
  gl_FragColor.rg = uv;
  gl_FragColor.b = sin(time) * 0.5 + 0.5;
  gl_FragColor.a = 1.0;
}
`.trim()
})

setTimeout(function () {
  update()
  source.editor.on('change', update)
})

require('glsl-editor/css')
require('glsl-editor/theme')
window.addEventListener('resize', function () {
  source.resize()
  outFrag.resize()
  outVert.resize()
}, false)

function update () {
  var value = source.getValue()
  var result = format(value)

  outFrag.setValue(result.frag)
  outVert.setValue(result.vert)
}
