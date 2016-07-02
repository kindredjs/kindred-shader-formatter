const test = require('tape')
const prefix = require('../prefix')

test('kindred-shader-formatter: prefix.source()', function (t) {
  t.equal(prefix.source(), '', 'empty if no object supplied')
  t.equal(prefix.source({}), '', 'empty if empty object supplied')

  t.equal(prefix.source({ INT: 5 }), '#define INT 5', 'integers are supplied as numbers')
  t.equal(prefix.source({ INT: 5.5 }), '#define INT 5', 'floats are converted to integers when supplied as numbers')

  t.equal(prefix.source({ FLOAT: [5.5] }), '#define FLOAT 5.5', 'numbers in arrays are converted to floats')
  t.equal(prefix.source({ FLOAT: [5] }), '#define FLOAT 5.0', 'numbers in arrays are converted to floats even if integer values')

  t.equal(prefix.source({ VEC: [1, 2] }), '#define VEC vec2(1.0, 2.0)', 'vec2 as expected')
  t.equal(prefix.source({ VEC: [1, 2, 3] }), '#define VEC vec3(1.0, 2.0, 3.0)', 'vec3 as expected')
  t.equal(prefix.source({ VEC: [1, 2, 3, 4] }), '#define VEC vec4(1.0, 2.0, 3.0, 4.0)', 'vec4 as expected')

  t.throws(function () {
    prefix.source({ VEC: [1, 2, 3, 4, 5] })
  }, 'throws when value is Number[>=5]')

  t.throws(function () {
    prefix.source({ VEC: 'vec3(0)' })
  }, 'throws when value is String')

  t.throws(function () {
    prefix.source({ VEC: { hello: 'world' } })
  }, 'throws when value is Object')

  t.end()
})
