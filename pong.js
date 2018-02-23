let animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

let canvas = document.createElement('canvas');
let width = 600;
let height = 400;
canvas.width = width;
canvas.height = height;
let context = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

let step = function() {
    update();
    render();
    animate(step);
};
let update = function() {
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
    this.paddle = new Paddle(575, 180, 10, 50);
}

function Computer() {
    this.paddle = new Paddle(25, 180, 10, 50);
}
Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};
let player = new Player();
let computer = new Computer();
let ball = new Ball(300, 200);

let render = function() {
    context.fillStyle = "#99FFFF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};
