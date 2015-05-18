var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var RESOLUTION = canvas.width;
var LEFT_OFFSET = canvas.offsetLeft;
var TOP_OFFSET = canvas.offsetTop;

// defines the max number of times we iterate for a given number
var MAX_ITERATIONS = 1000;

// returns the number of iterations it took to see if the number is bounded
var isBounded = function(c) {
  // we are simulating an imaginary number by using 2 js numbers (1 for the 'real' part, and 1 for the 'imaginary' part)
  var m = {r: 0, i: 0}; // m for Mandelbrot :)

  for (var i = 0; i < MAX_ITERATIONS; i++) {
    // fc(z) = z^2 + C
    // (a+bi)*(a+bi) = a^2 - b^2 + 2ab
    var temp = m.r;
    m.r = (m.r * m.r) - (m.i * m.i) + c.r;
    m.i = 2 * temp * m.i + c.i;

    // Pythagorean theorem. Calculating if distance from origin is greater than 2
    // if: a^2 + b^2 > 2^2
    // since we are on the complex plane, 'a' is the real part, 'b' is the imaginary part
    if (m.r * m.r + m.i * m.i > 4) {
      // number tends to infinity, return # of iterations
        return i;
    }
  }
  // number might be bounded, return # of iterations
  return i;
};

var draw = function(zoom, x, y, canvas) {
  for (var r = 0; r < RESOLUTION; r++) {
    for (var c = 0; c < RESOLUTION; c++) {
      // convert from Cartesian coordinates to complex coordinates
      var complex = {r: x - zoom/2 + zoom*c/RESOLUTION, i: y + zoom/2 - zoom*r/RESOLUTION};

      // test the point and return number of iterations
      var n = isBounded(complex);

      // The RGB values of each coordinate are a function of the number of iterations
      canvas.fillStyle = "rgb("+(4*n)%255+","+(3*n)%255+","+(8*n)%255+")";
      // canvas.fillStyle = "rgb("+(n)%255+","+(n)%255+","+(n)%255+")";
      canvas.fillRect(c, r, 1, 1);
    }
  }
};

var zoomIn = function(position) {
  // resize and recenter on the click coords
  x0 = x0 - zoom/2 + zoom * position.x / RESOLUTION;
  y0 = y0 + zoom/2 - zoom * position.y / RESOLUTION;
  zoom /= 10;
};

// 4 seems good, but this can be anything
zoom = 4;
var x0 = 0;
var y0 = 0;


draw(zoom, x0, y0, ctx);

var handleClick = function(event) {
  var x = event.pageX - LEFT_OFFSET;
  var y = event.pageY - TOP_OFFSET;
  console.log('X: ' + x + ' Y: ' + y);
  zoomIn({x: x, y: y});
  draw(zoom, x0, y0, ctx);
};

canvas.addEventListener('mousedown', handleClick);
