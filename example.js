var canvas = document.body.appendChild(document.createElement('canvas'))
var gl = canvas.getContext('webgl')

var triangle = require('a-big-triangle')
var Shader = require('gl-shader')
var Fit = require('canvas-fit')
var sh = require('./')

var start = Date.now()
var source = sh`
  attribute vec2 position;
  uniform float time;
  varying vec2 uv;

  void vert() {
    gl_Position = vec4(uv = position, 1, 1);
  }

  vec2 pow2(vec2 a, float b) {
    return vec2(pow(a.x, b), pow(a.y, b));
  }

  void frag() {
    gl_FragColor = vec4(1.0 - pow2(abs(uv), 5.0), sin(time) * 0.5 + 0.5, 1);
  }
`

var shader = Shader(gl, source.vert, source.frag)

render()
function render () {
  window.requestAnimationFrame(render)

  var width = canvas.width
  var height = canvas.height

  gl.viewport(0, 0, width, height)
  shader.bind()
  shader.uniforms.time = (Date.now() - start) / 1000

  triangle(gl)
}

window.addEventListener('resize', Fit(canvas), false)
