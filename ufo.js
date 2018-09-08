class Ufo {
    constructor() {
        this.x = 500;
        this.y = 300;
        this.angle = Math.random() * 360;
        this.shootAngle = Math.random() * 360;
        this.dx = 0;
        this.dy = 0;
        this.width = 45;
        this.height = 45;
        this.image = new Image();
        this.image.src = './images/ufo.png';
        this.alive = true;
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
    }
    shoot(player) {
        console.log("PIU PIU");
        generateLasers(player, this.x, this.y, this.shootAngle);
    }
}