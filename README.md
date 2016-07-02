# kindred-shader-formatter

Simplify authoring GLSL shaders and reduce boilerplate with a few helpful adjustments.

## Usage

For example, here's a kindred-style shader:

``` glsl
attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;

void vert() {
  vNormal = normal;
  gl_Position = vec4(position, 1);
}

void frag() {
  gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1);
}
```

Both the vertex and fragment shaders are written together — removing the need to keep a duplicate list of uniforms/varyings/attributes in each file. You can pass this shader into `kindred-shader-formatter` to get two separate fragment and vertex shaders to pass into your WebGL library of choice.

``` javascript
var format = require('kindred-shader-formatter')
var glslify = require('glslify')

var formatted = format(glslify('./shader.glsl'))

console.log(formatted.vert)
console.log(formatted.frag)
```

This leaves you with two shaders like the following:

``` glsl
precision highp float;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;

void vert() {
  vNormal = normal;
  gl_Position = vec4(position, 1);
}

void main() { vert(); }
```
``` glsl
precision highp float;

varying vec3 vNormal;

void frag() {
  gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1);
}

void main() { frag(); }
```

Under the hood, we're making a few changes to your shaders:

* Vertex and fragment shaders are written as a single shader, using `void vert()` and `void frag()` respectively in place of `void main()`.
* Attribute declarations are removed from fragment shaders.
* `precision highp float;` is automatically added to your shaders if not otherwise specified.
* Unused functions are automatically removed using [glsl-token-function-shaker](https://github.com/stackgl/glsl-token-function-shaker).

## API

### `format(source)`

### `format.vert(source)`

### `format.frag(source)`
