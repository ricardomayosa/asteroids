class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width  = canvas.width;
        this.height = canvas.height;
        this.image  = new Image();
        this.images = [
            'https://bit.ly/2opSz89',
            'https://bit.ly/2BYV4Yw',
            'https://bit.ly/2LzilQr',
            'https://bit.ly/2LCtxvw',
            'https://bit.ly/2ogHGVU',
            'https://bit.ly/2wvInyn'
        ];
        this.image.src = '';
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    selectImage() {
        // Random background image
        this.image.src = this.images[Math.floor(Math.random() * this.images.length)]; 

    }
}