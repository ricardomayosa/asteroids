var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerImg = ['./images/player1.png', './images/player2.png'];
var asteroidImg = './images/asteroid.png';
var degreesPlayer1 = 0;
var degreesPlayer2 = 0;
var asteroids = [];

//ctx.strokeRect(0,0,canvas.width, canvas.height);

var back = new Background();
var player1 = new Player(600,350,50,120,playerImg[0]);
var player2 = new Player(300,350,50,120,playerImg[1]);
var asteroid = new Asteroid();
back.selectImage();

var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0,0, 1000, 600);
    back.draw();
    drawPlayers();
    
    //asteroid.draw();
    //asteroid.move();
    generateAsteroids();
    drawAsteroids(frames);

}, 1000/60);

function drawPlayers() {
    if(player1.alive && player2.alive) {
        player1.draw(degreesPlayer1);
        player2.draw(degreesPlayer2);
    } else if(player1.alive && !player2.alive) {
        player1.draw(degreesPlayer1);
    } else if(!player1.alive && player2.alive) {
        player2.draw(degreesPlayer2);
    } else {
        clearInterval(interval);
    }
    
}

function generateAsteroids() {
    if (frames % 140 === 0) {
        let asteroid = new Asteroid(asteroidImg);
        asteroids.push(asteroid);
        console.log("Asteroide generado");
        // La cantidad de puntos es igual al tamaño del arreglo hasta este punto - 3
        // if(obstacles.length > 3) {
        //     score = obstacles.length - 3;
        // }
    }
}

function drawAsteroids(frames) {
    asteroids.forEach(function(asteroid) {
        // Mueve los obstáculos hacia abajo
        // if (frames % 10 === 0) {
        asteroid.move();
        
        asteroid.draw();
        if(player1.collision(asteroid)) {
            //console.log('P1 choco');
            player1.alive = false;
            //console.log("P1 esta vivo? " + player1.alive);
            //clearInterval(interval);
            checkGameOver();
        }
        if(player2.collision(asteroid)) {
            //console.log('P2 choco');
            //clearInterval(interval);
            player2.alive = false;
            //console.log("P2 esta vivo? " + player2.alive);
            checkGameOver();
        }
    });
}

function checkGameOver() {
    if(player1.alive === false && player2.alive === false) {
        //clearInterval(interval);
        console.log('Game Over');
    }
}

addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 1
        // Up Arrow
        case 38:
            player1.move(degreesPlayer1);
            break;
        // Right Arrow    
        case 39:
            degreesPlayer1 += 15;
            if(degreesPlayer1 === 360) {
                degreesPlayer1 = 0;
            } else if(degreesPlayer1 > 360) {
                degreesPlayer1 = degreesPlayer1 - 360;
            }
            player1.draw(degreesPlayer1);
            break;
        // Left Arrow
        case 37:
            degreesPlayer1 -= 15;
            if(degreesPlayer1 === 360) {
                degreesPlayer1 = 0;
            } else if(degreesPlayer1 < 0) {
                degreesPlayer1 = degreesPlayer1 + 360;
            }
            player1.draw(degreesPlayer1);
            break;
    }
});
addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 2
        // W
        case 87:
            player2.move(degreesPlayer2);
            break;
        // D  
        case 68:
            degreesPlayer2 += 15;
            player2.draw(degreesPlayer2);
            break;
        // A
        case 65:
            degreesPlayer2 -= 15;
            player2.draw(degreesPlayer2);
            break;
        default:
            break;
    }
});
