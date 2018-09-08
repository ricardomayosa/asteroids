class Laser {
    constructor(player,x,y,angle) {
        this.player = player;
        this.x = x + player1.width/2;
        this.y = y + player1.height/2;
        //this.x = player1.x + player1.width/2;
        //this.y = player1.y + player1.height/2;
        this.dx = 0;
        this.dy = 0;
        this.angle = angle;
        //this.angle = Math.random() * 360;
        this.width = 20;
        this.height = 20;
        this.image = new Image();
        this.image.src = './images/laser.png';
    }
    draw() {
        // ctx.save();
        // ctx.beginPath();
        // // move to the center of the canvas
        // ctx.translate(this.x + this.width/2, this.y + this.height/2);
        // // rotate the canvas to the specified degrees
        // ctx.rotate(this.angle * -Math.PI/180);
        // // draw the image
        // // since the context is rotated, the image will be rotated also
        // ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        // // we’re done with the rotating so restore the unrotated context
        // ctx.restore();

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move() {
        this.dx = Math.sin(this.angle * (Math.PI / 180)) * 40;
        this.dy = Math.cos(this.angle * (Math.PI / 180)) * 40;
        this.x += this.dx;
        this.y -= this.dy;
        
        // if(this.x > canvas.width) {
        //     // Reaparece a la izquierda
        //     this.x = -this.width;
        // } 
        // if(this.x + this.width < 0) {
        //     // Reaparece a la derecha
        //     this.x = canvas.width;
        // } 
        // if (this.y > canvas.height) {
        //     // Reaparece arriba
        //     this.y = -this.height;
        // } 
        // if (this.y + this.height < 0)  {
        //     // Reaparece abajo
        //     this.y = canvas.height;
        // } 
    }

}