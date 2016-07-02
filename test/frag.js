const test = require('tape')
const frag = require('../frag')

test('kindred-shader-formatter: frag', function (t) {
  const converted = frag(`
    attribute vec2 position;
    attribute vec2 uv;

    varying vec2 vUV;

    void vert() {
      vUV = uv;
      gl_Position = vec4(position, 0, 1);
    }

    void frag() {
      gl_FragColor = vec4(1, 0, 1, 1);
    }
  `)

  t.ok(converted.indexOf('vert') === -1, 'vert() was removed')
  t.ok(converted.indexOf('attribute') === -1, 'attributes were removed')
  t.ok(converted.indexOf('varying') !== -1, 'varyings were not removed')
  t.ok(converted.indexOf('main') !== -1, 'main() was added')
  t.ok(converted.indexOf('precision highp float') !== -1, 'precision was added')

  t.end()
})
