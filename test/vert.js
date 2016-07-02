const test = require('tape')
const vert = require('../vert')

test('kindred-shader-formatter: vert', function (t) {
  const converted = vert(`
    void vert() {
      gl_Position = vec4(1, 0, 0, 1);
    }

    void frag() {
      gl_FragColor = vec4(1, 0, 1, 1);
    }
  `)

  t.ok(converted.indexOf('frag') === -1, 'frag() was removed')
  t.ok(converted.indexOf('main') !== -1, 'main() was added')
  t.ok(converted.indexOf('precision highp float') !== -1, 'precision was added')

  t.end()
})
