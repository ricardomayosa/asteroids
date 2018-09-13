class Player extends Item {
    constructor(x,y,width,height,image) {
        super(x,y,width,height,image);
        this.alive = true;
        this.degrees = 0;
        this.score = 0;
        this.dx = 0;
        this.dy = 0;
        this.explosion = new Image();
        this.explosion.src = './images/explosion.png';
    }
    collision(item) {
        //this.alive = false;
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
        
        // console.log("Chocaste");
    }
    move() {
        this.dx = Math.sin(this.degrees * (Math.PI / 180)) * 40;
        this.dy = Math.cos(this.degrees * (Math.PI / 180)) * 40;
        this.x += this.dx;
        this.y -= this.dy;
        
        if(this.x > canvas.width) {
            // Reaparece a la izquierda
            this.x = -this.width;
        } 
        if(this.x < 0) {
            // Reaparece a la derecha
            this.x = canvas.width;
        } 
        if (this.y > canvas.height) {
            // Reaparece arriba
            this.y = -this.height;
        } 
        if (this.y + this.height < 0)  {
            // Reaparece abajo
            this.y = canvas.height;
        } 
        
    }
    shoot() {
        console.log("PIU PIU");
    }
    draw(degrees) {
        this.degrees = degrees;
        ctx.save();
        ctx.beginPath();
        // move to the center of the canvas
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI/180);
        // draw the image
        // since the context is rotated, the image will be rotated also
        ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        
        // we’re done with the rotating so restore the unrotated context
        ctx.restore();
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}