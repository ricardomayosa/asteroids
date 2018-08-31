var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerImg = ['./images/player2.png', './images/player1.png', 'https://bit.ly/2wv84jf'];
var degrees = 0;

//ctx.strokeRect(0,0,canvas.width, canvas.height);

var back = new Background();
var player = new Player(300,250,50,120,playerImg[0]);
back.selectImage();

var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0,0, 1000, 600);
    back.draw();
    player.rotate(degrees);
}, 1000/60);

addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // Up Arrow
        case 38:
            player.move();
            break;
        // Right Arrow    
        case 39:
            degrees += 15;
            player.rotate(degrees);
            break;
        // Left Arrow
        case 37:
            degrees -= 15;
            player.rotate(degrees);
            break;
        default:
            break;
    }
});

