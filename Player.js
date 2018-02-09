function Player() {
    this.position = new Paddle(175, 580, 50, 10);
}

function Computer() {
    this.position = new Paddle(175, 10, 50, 10);
}
Player.prototype.render = function() {
    this.position.render();
};

Computer.prototype.render = function() {
    this.position.render();
};

let player = new Player();
let computer = new Computer();
let ball = new Ball(200, 300);

let render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};
let update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.position, computer.position);
};

Player.prototype.update = function() {
    for(let key in keysDown) {
        let value = Number(key);
        if(value == 37) { // left arrow
            this.position.move(-4, 0);
        } else if (value == 39) { // right arrow
            this.position.move(4, 0);
        } else {
            this.position.move(0, 0);
        }
    }
};

Computer.prototype.update = function(ball) {
    let x_pos = ball.x;
    let diff = -((this.position.x + (this.position.width / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
        diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed right
        diff = 5;
    }
    this.position.move(diff, 0);
    if(this.position.x < 0) {
        this.position.x = 0;
    } else if (this.position.x + this.position.width > 400) {
        this.position.x = 400 - this.position.width;
    }
};