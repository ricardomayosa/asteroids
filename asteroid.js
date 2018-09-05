class Asteroid extends Item {
    constructor() {
        super();
        this.x = 50;
        this.y = 50;
        this.width = 200;
        this.height = 200;
        this.image = new Image();
        this.image.src = './images/asteroid.png';
        this.alive = true;
    }
    move() {

    }
}