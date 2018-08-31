class Player extends Item {
    constructor(x,y,width,height,image) {
        super(x,y,width,height,image);
        this.alive = true;
        this.score = 0;
    }
    colision() {
        this.alive = false;
        console.log("Chocaste");
    }
    move() {
        this.y -= 20;
        
    }
    shoot() {
        console.log("PIU PIU");
    }
    rotate(degrees) {

        ctx.save();
        ctx.beginPath();
        // move to the center of the canvas
        ctx.translate(player.x + player.width/2, player.y + player.height/2);

        // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI/180);

        // draw the image
        // since the context is rotated, the image will be rotated also
        
        ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);

        // we’re done with the rotating so restore the unrotated context
        ctx.restore();
    }
}