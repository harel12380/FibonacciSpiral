// setup the fibonacciCanvas
var fibonacciCanvas = document.getElementById('fibonacciCanvas');
var context = fibonacciCanvas.getContext('2d');
var scaler = 5;
var fibSequence = [1, 1];

// Handle edge cases

fibonacciCanvas.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
});

const updateCanvasSize = () => {
  fibonacciCanvas.width = innerWidth;
  fibonacciCanvas.height = innerHeight;
};

updateCanvasSize();
window.addEventListener('resize', updateCanvasSize);



// calculate the next fibonacci sequence
function nextFibonacci() {
  var lastIndex = fibSequence.length;
  var newFibonacci = fibSequence[lastIndex - 1] + fibSequence[lastIndex - 2];

  fibSequence.push(newFibonacci);
  fibSequence.shift();

  return newFibonacci;
}

// the position in the screen to draw from
let x = fibonacciCanvas.width / 2;
let y = fibonacciCanvas.height / 2;

// Draw a cube in the center of the screen (also the center of the fibonacci canvas)
context.fillRect(x - 2.5, y - 2.5, 5, 5);

context.lineWidth = 5;
context.strokeStyle = '#000';

// the next direction for the spiral
let horizontalRight = true;
let verticalUp = true;
let toggleVertical = true;

// the angel in which the spiral starts with
var startAngle = 90;

function calcNewPoint(radius) {
  let newX = x;
  let newY = y;

  if (toggleVertical) {
    if (horizontalRight) {
      // 2
      newX -= radius;
      newY += radius;
    } else {
      // 4
      newX += radius;
      newY -= radius;
    }
  } else {
    if (horizontalRight) {
      // 3
      newX += radius;
      newY += radius;
    } else {
      // 1
      newX -= radius;
      newY -= radius;
    }
  }

  return [newX, newY];
}

function toggleNextDirection() {
  if (toggleVertical) {
    verticalUp = !verticalUp;
  } else {
    horizontalRight = !horizontalRight;
  }
}

function calcDrawPoint(baseX, baseY, radius) {
  if (toggleVertical) {
    baseX += horizontalRight ? radius : -radius;
  } else {
    baseY += horizontalRight ? -radius : radius;
  }

  return [baseX, baseY];
}

function drawFibonacci() {
  let currFibonacci = nextFibonacci();
  let radius = currFibonacci * scaler;

  toggleVertical = !toggleVertical;

  let [newX, newY] = calcNewPoint(radius);
  let [xToDraw, yToDraw] = calcDrawPoint(newX, newY, radius);

  var endAngle = startAngle + 90;

  context.beginPath();
  context.arc(
    xToDraw,
    yToDraw,
    radius,
    (startAngle * Math.PI) / 180,
    (endAngle * Math.PI) / 180,
    false
  );
  context.stroke();

  x = newX;
  y = newY;

  toggleNextDirection();

  startAngle -= 90;
}

// draw a part of the fibonacci spiral each 100ms
setInterval(drawFibonacci, 100);
