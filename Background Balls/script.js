const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray = [];
let ballCount = Math.min(
  Math.ceil(window.innerWidth / 4),
  Math.ceil(window.innerHeight / 2.25)
);
const colors = ["#FBEEC1", "#C5CBE3", "#A4B3B6"];
let colorIndex = 0;

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); //x-cord as center point, y-cord as center point, radius, start-angle, end-angle (360 given here), counterclockwise
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0)
    this.directionX = -this.directionX;
  if (this.y + this.size > canvas.height || this.y - this.size < 0)
    this.directionY = -this.directionY;

  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
};

function init(ballCount) {
  for (let i = 0; i < ballCount; i++) {
    let size = Math.random() * 15;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = Math.random() * 0.4 - 0.2;
    let directionY = Math.random() * 0.4 - 0.2;
    colorIndex = colorIndex > colors.length ? 0 : colorIndex + 1;
    const color = colors[colorIndex];

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particleArray.forEach((particle) => {
    particle.update();
  });
}

init(ballCount);
animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particleArray = [];
  ballCount = Math.min(
    Math.ceil(window.innerWidth / 4),
    Math.ceil(window.innerHeight / 2.25)
  );
  init(ballCount);
});
