// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const num = document.createElement('p');
const body = document.querySelector('body');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ballsMaxNum = 25;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this,x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
Ball.prototype.draw = function () {
  // ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this != balls[j]) {
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

function EvilCircle(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size ;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
EvilCircle.prototype.draw = function() {
  // console.log(this.color)
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) > width) {
    this.x  = this.x - this.size;
  }

  if ((this.x - this.size) < 0) {
    this.x = this.x + this.size;
  }

  if ((this.y + this.size) > height) {
    this.y = this.y - this.size;
  }

  if ((this.y - this.size) < 0) {
    this.y = this.y + this.size;
  }
}
EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch (e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  }
}
EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
}

let r = random(10,20);
let oop = new EvilCircle(random(r, width-r),random(r, height-r),20,20, 'rgb(255,255,255)', r, true);

// let ball1 = new Ball(50, 300, 10, 5, 'red', 30);
// setInterval(() => {
//   ball1.draw();
//   ball1.update();
// }, 100);

let balls = [];
while (balls.length < ballsMaxNum) {
  let size = random(10,20);
  let ball = new Ball(random(size, width-size),random(size, height-size),random(-7, 7),random(-7, 7), randomColor(), size, true);
  balls.push(ball);
}

function loop() {
  let ballNum = 0;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  oop.draw();
  oop.checkBounds();
  oop.setControls();
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      ballNum++;
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      oop.collisionDetect();
    }
  }
  num.textContent = '还剩'+ ballNum + '球';
  body.appendChild(num);
  // 再次运行loop函数
  requestAnimationFrame(loop);
}

loop();


