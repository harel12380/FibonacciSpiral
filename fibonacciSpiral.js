// setup the fibonacciCanvas
var fibonacciCanvas = document.getElementById('fibonacciCanvas');
var context = fibonacciCanvas.getContext('2d');

fibonacciCanvas.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
});

const updateCanvasSize = () => {
  fibonacciCanvas.width = innerWidth;
  fibonacciCanvas.height = innerHeight;
  restartFibonacci();
};

updateCanvasSize();
window.addEventListener('resize', updateCanvasSize);


var scaler = 5;

var fibSequence = [1, 1];

function nextFibonacci() {
  var lastIndex = fibSequence.length;
  var newFibonacci = fibSequence[lastIndex - 1] + fibSequence[lastIndex - 2];

  fibSequence.push(newFibonacci);
  fibSequence.shift();

  return newFibonacci;
}

let x = fibonacciCanvas.width / 2;
let y = fibonacciCanvas.height / 2;

context.fillRect(x - 2.5, y - 2.5, 5, 5);

let horizontalRight = true;
let verticalUp = true;
let toggleVertical = true;

var startAngle = 90;

function drawFibonacci() {
  context.lineWidth = 1;

  let currFibonacci = nextFibonacci();
  let radius = currFibonacci * scaler;

  toggleVertical = !toggleVertical;

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

  let xToDraw = newX;
  let yToDraw = newY;

  if (toggleVertical) {
    xToDraw += horizontalRight ? radius : -radius;
  } else {
    yToDraw += horizontalRight ? -radius : radius;
  }

  var endAngle = startAngle + 90;

  context.beginPath();
  context.strokeStyle = '#000000';
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

  // toggle sizes
  if (toggleVertical) {
    verticalUp = !verticalUp;
  } else {
    horizontalRight = !horizontalRight;
  }

  startAngle -= 90;
}
setInterval(drawFibonacci, 100);

function restartFibonacci() {
  fibSequence = [1, 1];
}