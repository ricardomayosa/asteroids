class Item {
    constructor(x,y,width,height,image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}