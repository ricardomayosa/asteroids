class Ufo extends Item {
    constructor(x,y,width,height,image) {
        super(x,y,width,height,image);
        this.alive = true;
    }
    shoot() {
        console.log("PIU PIU");
    }
}