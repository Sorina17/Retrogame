function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}
let context = canvas.getContext('2d');
Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};

let update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.position, computer.position);
};

Ball.prototype.update = function(positon1, position2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    let top_x = this.x - 5;
    let top_y = this.y - 5;
    let bottom_x = this.x + 5;
    let bottom_y = this.y + 5;

    if(this.x - 5 < 0) { // hitting the left wall
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 400) { // hitting the right wall
        this.x = 395;
        this.x_speed = -this.x_speed;
    }

    if(this.y < 0 || this.y > 600) { // a point was scored
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 300;
    }

    if(top_y > 300) {
        if(top_y < (positon1.y + positon1.height) && bottom_y > positon1.y && top_x < (positon1.x + positon1.width) && bottom_x > positon1.x) {
            // hit the player's paddle
            this.y_speed = -3;
            this.x_speed += (positon1.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if(top_y < (position2.y + position2.height) && bottom_y > position2.y && top_x < (position2.x + position2.width) && bottom_x > position2.x) {
            // hit the computer's paddle
            this.y_speed = 3;
            this.x_speed += (position2.x_speed / 2);
            this.y += this.y_speed;
        }
    }
};
