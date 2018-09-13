class LittleAsteroid {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.dx = 0;
        this.dy = 0;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = './images/asteroid.png';
        this.alive = true;
    }
    collision(item) {
        //this.alive = false;
        // console.log('Entered collision check');
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
        // console.log("Chocaste");
    }
    move() {
        // this.x += this.velX;
        // this.y += this.velY;
        //console.log('ANGULO DEL ASTEROIDE=' + this.angle);
        this.dx = Math.sin(this.angle * (Math.PI / 180)) * 1;
        this.dy = Math.cos(this.angle * (Math.PI / 180)) * 1;
        this.x += this.dx;
        this.y -= this.dy;

        if(this.x > canvas.width) {
            // Reaparece a la izquierda
            this.x = -this.width;
        } 
        if(this.x + this.width < 0) {
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
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}