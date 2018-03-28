var d = document;

var c = d.getElementById('c');
var ctx = c.getContext('2d');
var pts = [];
var rand = Math.random;
var floor = Math.floor;
var h1 = document.createElement('h1');
var GR = 1.61803398875;
c.width = window.innerWidth;
c.height = window.innerHeight;

if (c.width > 950) {
  h1.style.left = (c.width / GR) + 'px';
} else {
  h1.style.left = (c.width / 20) + 'px';
}

h1.classList.add('lerp-header');
h1.style.position = 'absolute';
h1.style.top = c.height / 11 + 'px';
h1.style.fontSize = (c.height / 11) + 'px';
h1.style.lineHeight = (c.height / 7) + 'px';
h1.innerHTML = '<mark>RAUL</mark><br><mark>RODRIGUEZ</mark><br><mark>/CC</mark><br><mark><b class="lerp-text"><a target="_blank" href="h"><a class="px-2" href="mailto: raul.f.rodriguez.19@dartmouth.edu">📩</a><a class="px-2" href="https://github.com/rah-ool">👨‍💻</a><a class="px-2" href="https://www.linkedin.com/in/raulfelixrodriguez">📇</a></b></mark>';

document.body.appendChild(h1);
var lerpText = document.querySelector('.lerp-text').children[0];
lerpText.style.color = '#33FFCC';

document.body.style.padding = 0;
document.body.style.margin = 0;

// Algorithm taken from Computational Geometry: Algorithms and Applications
// 1. E←0/.
// 2. for all ordered pairs (p,q) ∈ P×P with p not equal to q
// 3.   do valid ← true
// 4.     for all points r ∈ P not equal to p or q
// 5.       do if r lies to the left of the directed line from p to q
// 6.         then valid ← false.
// 7.       if valid then Add the directed edge pq to E.
// 8. From the set E of edges construct a list L of vertices of CH(P), sorted in clockwise order.


// Cross-browser animation idea courtesy of paulirish / http://paulirish.com/
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function */ callback, /* DOMElement */ element) {
      return window.setTimeout(callback, 1000 / 60);
  };
})();

window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout;
})();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

var amount = 0;
var newX, newY;
var times = 3;
var ctr = 0;
var colors = ['#333', '#FF3366', '#33FFCC'];
var widths = [1, 2, 3];
var ptCnt = 2;

function generatePoints() {
  for (i = 0; i < ptCnt; i++) {
    pts.push({
      x: floor(rand() * c.width),
      y: floor(rand() * c.height)
    });
  }
}

generatePoints();
animate();
drawPoints();

function drawPoints() {
  for (i = 0; i < ptCnt; i++) {
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, widths[ctr]/2, 0, 2 * Math.PI);
    ctx.fillStyle = colors[ctr];
    ctx.fill();
  }
}


function animate() {
  request = requestAnimFrame(animate, c);
  draw();
}


function draw() {
  console.log('running', ctr);

  if (pts.length === 0) {
    if (ctr === 2) {
      ctx.clearRect(0, 0, c.width, c.height);
      if (widths[2] === 89) widths = [1,2,3];
      if (widths[2] === 34) widths = [34,55,89];
      if (widths[2] === 13) widths = [13,21,34];
      if (widths[2] === 3) widths = [5,8,13];

      // cancelRequestAnimFrame(request);
      // request = null;
      console.log('fin');
      ptCnt+=2;
    }
    ctr = (ctr === 2) ? 0 : ctr + 1;

    lerpText.style.color = colors[(ctr === 2) ? 0 : ctr + 1];
    generatePoints();
    drawPoints();

  }

  amount += 0.05; // change to alter duration
  if (amount > 1) amount = 1;

  ctx.beginPath();

  ctx.moveTo(pts[0].x, pts[0].y); // a

  // lerp : a  + (b - a) * f
  newX = pts[0].x + (pts[pts.length - 1].x - pts[0].x) * amount;
  newY = pts[0].y + (pts[pts.length - 1].y - pts[0].y) * amount;

  ctx.lineTo(newX, newY);

  ctx.lineWidth = widths[ctr];
  ctx.strokeStyle = colors[ctr];
  ctx.lineCap = 'round';

  ctx.stroke();


  if (newX === pts[pts.length - 1].x && newY === pts[pts.length - 1].y) {
    pts = pts.slice(1);
    pts.pop();
    amount = 0;
  }
}
