var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerImg = ['./images/player1.png', './images/player2.png'];
var asteroidImg = './images/asteroid.png';
var degreesPlayer1 = 0;
var degreesPlayer2 = 0;
var asteroids = [];
var lasers = [];

var back = new Background();
// var player1 = new Player(600,350,50,120,playerImg[0]);
var player1 = new Player(600,350,50,70,playerImg[0]);
var player2 = new Player(300,350,50,70,playerImg[1]);
//var asteroid = new Asteroid();
back.selectImage();

var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0,0, 1000, 600);
    back.draw();
    drawPlayers();
    generateAsteroids();
    drawAsteroids(frames);
    // generateLasers();
    // drawLasers();
    //drawLasers();
    if(lasers.length > 0) {
        //console.log('Length: ' + lasers.length);
        drawLasers();
    }
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
    }
}

function drawAsteroids(frames) {
    asteroids.forEach(function(asteroid) {
        asteroid.draw();
        asteroid.move();
        if(player1.collision(asteroid)) {
            player1.alive = false;
            ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
        }
        if(player2.collision(asteroid)) {
            player2.alive = false;
            ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
        }
    });
}

function generateLasers(player,x,y,angle) {
    // if (frames % 140 === 0) {
        
    // }
    let laser = new Laser(player,x,y,angle);
    lasers.push(laser);
    // console.log('entered drawAsteroids()');
    // let laser = new Laser(200,200,angle);
    // lasers.push(laser);
    // console.log('length' + lasers.length);
}
function drawLasers(frame) {
    lasers.forEach(function(laser) {
        laser.draw();
        laser.move();
    })
}
// function checkGameOver() {
//     if(player1.alive === false && player2.alive === false) {
//         console.log('Game Over');
//     }
// }

// P1 Controlls
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
        // Dash '-'
        case 189:
            console.log('Angles when key pressed: ' + degreesPlayer1);
            // player1.x + player1.x/2, player1.y - player1.y/2, 
            generateLasers('player 1', player1.x, player1.y, degreesPlayer1);
            //player1.x, player1.y, 
            
            //drawLasers();
            break;
        default:
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
        case 69:
            console.log('Angles when key pressed: ' + degreesPlayer1);
            // player1.x + player1.x/2, player1.y - player1.y/2, 
            generateLasers('player 2', player2.x, player2.y, degreesPlayer2);
            //player1.x, player1.y, 
            
            //drawLasers();
            break;
        default:
            break;
    }
});
