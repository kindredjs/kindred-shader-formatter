const Shader = require('gl-shader')
const glslify = require('glslify')
const format = require('../')
const test = require('tape')
const GL = require('gl')

/**
 * GL_OES_standard_derivatives's dFx and dFy functions are unavailable
 * in vertex shaders. As such, including glsl-aastep would cause compliation
 * to fail.
 *
 * By employing tree shaking, we can safely remove aastep from the vertex
 * shader because it's unused there.
 */
const src = `
#extension GL_OES_standard_derivatives : enable

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;

#pragma glslify: aastep = require('glsl-aastep')

void vert() {
  vNormal = normal;
  gl_Position = vec4(position, 1);
}

void frag() {
  float flag = aastep(vNormal.x, 0.0);
  gl_FragColor = vec4(vNormal * 0.5 + 0.5, flag * FLAG_MULT);
}
`.trim()


test('kindred-shader-formatter: aastep', function (t) {
  const gl = GL(256, 256)

  glslify.bundle(src, { inline: true }, function (err, result) {
    if (err) return t.ifError(err)

    var formatted = format(result, {
      FLAG_MULT: [2]
    })

    t.ok(formatted.vert.indexOf('FLAG_MULT 2.0') !== -1, 'prefix was applied to vert')
    t.ok(formatted.frag.indexOf('FLAG_MULT 2.0') !== -1, 'prefix was applied to frag')
    t.ok(formatted.vert.indexOf('aastep') === -1, 'vertex shader is excluding aastep')
    t.ok(formatted.frag.indexOf('aastep') !== -1, 'fragment shader contains aastep')
    t.doesNotThrow(function () {
      Shader(gl, formatted.vert, formatted.frag)
    }, 'shader compiles successfully')

    gl.destroy()

    t.end()
  })
})
