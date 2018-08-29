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
    shoot() {
        console.log("PIU PIU");
    }
}