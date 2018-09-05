class Asteroid extends Item {
    constructor() {
        super();
        this.x = 50;
        this.y = 50;
        this.angle = Math.random() * 360;
        this.dx = 0;
        this.dy = 0;
        this.width = 150;
        this.height = 150;
        this.image = new Image();
        this.image.src = './images/asteroid.png';
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
            this.x = 0;
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
}