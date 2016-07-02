const test = require('tape')
const prefix = require('../prefix')

test('kindred-shader-formatter: prefixing', function (t) {
  t.equal(prefix(), '', 'empty if no object supplied')
  t.equal(prefix({}), '', 'empty if empty object supplied')

  t.equal(prefix({ INT: 5 }), '#define INT 5\n\n', 'integers are supplied as numbers')
  t.equal(prefix({ INT: 5.5 }), '#define INT 5\n\n', 'floats are converted to integers when supplied as numbers')

  t.equal(prefix({ FLOAT: [5.5] }), '#define FLOAT 5.5\n\n', 'numbers in arrays are converted to floats')
  t.equal(prefix({ FLOAT: [5] }), '#define FLOAT 5.0\n\n', 'numbers in arrays are converted to floats even if integer values')

  t.equal(prefix({ VEC: [1, 2] }), '#define VEC vec2(1.0, 2.0)\n\n', 'vec2 as expected')
  t.equal(prefix({ VEC: [1, 2, 3] }), '#define VEC vec3(1.0, 2.0, 3.0)\n\n', 'vec3 as expected')
  t.equal(prefix({ VEC: [1, 2, 3, 4] }), '#define VEC vec4(1.0, 2.0, 3.0, 4.0)\n\n', 'vec4 as expected')

  t.throws(function () {
    prefix({ VEC: [1, 2, 3, 4, 5] })
  }, 'throws when value is Number[>=5]')

  t.throws(function () {
    prefix({ VEC: 'vec3(0)' })
  }, 'throws when value is String')

  t.throws(function () {
    prefix({ VEC: { hello: 'world' } })
  }, 'throws when value is Object')

  t.end()
})
