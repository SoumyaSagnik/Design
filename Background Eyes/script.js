const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let eyes = [];
let theta;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Eye {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    // draw eye
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // angle
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    theta = Math.atan2(dy, dx);

    // draw iris
    let irisX = this.x + (Math.cos(theta) * this.radius) / 10;
    let irisY = this.y + (Math.sin(theta) * this.radius) / 10;
    let irisRadius = this.radius / 1.3;
    ctx.beginPath();
    ctx.arc(irisX, irisY, irisRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "whitesmoke";
    ctx.fill();
    ctx.closePath();

    // draw pupil
    let pupilX = this.x + (Math.cos(theta) * this.radius) / 2.1;
    let pupilY = this.y + (Math.sin(theta) * this.radius) / 2.1;
    let pupilRadius = this.radius / 2.7;
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#212121";
    ctx.fill();
    ctx.closePath();

    // draw pupil reflection
    ctx.beginPath();
    ctx.arc(
      pupilX - pupilRadius / 3,
      pupilY - pupilRadius / 3,
      pupilRadius / 2.2,
      0,
      Math.PI * 2,
      true
    );
    ctx.fillStyle = "rgba(255, 255, 255, .1)";
    ctx.fill();
    ctx.closePath();

    //draw mouse
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 7.5, 0, Math.PI * 2, true);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();
  }
}

function init() {
  eyes = [];
  let noOfEyes = Math.floor((window.innerHeight * window.innerWidth) / 10000);
  let overlapping = false;
  let protection = 1000;
  let counter = 0;

  // avoiding overlapping of eyes
  while (eyes.length < noOfEyes && counter < protection) {
    let eye = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.floor(Math.random() * 100) + 15, // btw 15 & 105
    };
    overlapping = false;
    for (let i = 0; i < eyes.length; i++) {
      let previousEye = eyes[i];
      let dx = eye.x - previousEye.x;
      let dy = eye.y - previousEye.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < eye.radius + previousEye.radius) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) eyes.push(new Eye(eye.x, eye.y, eye.radius));
    counter++;
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, .25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  eyes.forEach((eye) => {
    eye.draw();
  });
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

/*
Formulas: 
x = center-coordinate + Math.cos(angle) * offset
y = center-coordinate + Math.sin(angle) * offset
Math.atan2 calculates the slope of hypoteneus
*/
