class Player extends Item {
    constructor(x,y,width,height,image) {
        super(x,y,width,height,image);
        this.alive = true;
        this.degrees = 0;
        this.score = 0;
        this.dx = 0;
        this.dy = 0;
    }
    colision() {
        this.alive = false;
        console.log("Chocaste");
    }
    move() {
        console.log('Degrees: ' + this.degrees);
        console.log('RAD: ' + this.degrees * (Math.PI / 180));
        this.dx = Math.sin(this.degrees * (Math.PI / 180)) * 40;
        console.log('Valor de X: ' + this.dx);
        this.dy = Math.cos(this.degrees * (Math.PI / 180)) * 40;
        console.log('Valor de Y: ' + this.dy);
        this.x += this.dx;
        this.y -= this.dy;
        
        if(this.x > canvas.width) {
            this.x = 0;
        } 
        if(this.x < 0) {
            this.x = canvas.width;
        } 
        
        if (this.y > canvas.height) {
            console.log('Ya se salió abajo');
            // Reaparece arriba
            this.y = -this.height;
        } 
        if (this.y + this.height < 0)  {
            console.log('Ya se salió arriba');
            // Reaparece abajo
            this.y = canvas.height;
        } 
        
    }
    shoot() {
        console.log("PIU PIU");
    }
    rotate(degrees) {
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
    }
}