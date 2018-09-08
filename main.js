var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var p1pts = 0;
var p2pts = 0;
var playerImg = ['./images/player1.png', './images/player2.png'];
var asteroidImg = './images/asteroid.png';
var ufoImg = './images/ufo.png';
var degreesPlayer1 = 0;
var degreesPlayer2 = 0;
var asteroids = [];
var ufos = [];
var lasers = [];
var back = new Background();
back.selectImage();
var player1 = new Player(600,350,50,70,playerImg[0]);
var player2 = new Player(300,350,50,70,playerImg[1]);


var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0,0, 1000, 600);
    back.draw();
    drawPlayers();
    generateAsteroids();
    drawAsteroids(frames);
    generateUfos();
    drawUfos();
    if(lasers.length > 0) {
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

function drawAsteroids() {
    asteroids.forEach(function(asteroid) {
        asteroid.draw();
        asteroid.move();
        if(player1.collision(asteroid)) {
            player1.alive = false;
            ctx.drawImage(player1.explosion, player1.x - 25, player1.y - 35, 300, 150);
        }
        if(player2.collision(asteroid)) {
            player2.alive = false;
            ctx.drawImage(player2.explosion, player2.x - 25, player2.y - 35, 300, 150);
        }
    });
}

function generateUfos() {
    if (frames % 600 === 0) {
        let ufo = new Ufo(ufoImg);
        ufos.push(ufo);
    }
}

function drawUfos() {
    ufos.forEach(function(ufo) {
        ufo.draw();
        ufo.move();
        if (frames % 100 === 0) {
            ufo.shoot('ufo');
        }

        if(player1.collision(ufo)) {
            player1.alive = false;
            ctx.drawImage(player1.explosion, player1.x - 25, player1.y - 35, 300, 150);
        }
        if(player2.collision(ufo)) {
            player2.alive = false;
            ctx.drawImage(player2.explosion, player2.x - 25, player2.y - 35, 300, 150);
        }
    });
}

function generateLasers(player,x,y,angle) {
    let laser = new Laser(player,x,y,angle);
    lasers.push(laser);
}

function drawLasers(frame) {
    lasers.forEach(function(laser) {
        laser.draw();
        laser.move();
    });
}

// P1 Controlls
addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 1
        // Up Arrow
        case 38:
            if(player1.alive) player1.move(degreesPlayer1);
            break;
        // Right Arrow    
        case 39:
            if(player1.alive) {
                degreesPlayer1 += 15;
                if(degreesPlayer1 === 360) {
                    degreesPlayer1 = 0;
                } else if(degreesPlayer1 > 360) {
                    degreesPlayer1 = degreesPlayer1 - 360;
                }
                player1.draw(degreesPlayer1);
            }
            break;
        // Left Arrow
        case 37:
            if(player1.alive) {
                degreesPlayer1 -= 15;
                if(degreesPlayer1 === 360) {
                    degreesPlayer1 = 0;
                } else if(degreesPlayer1 < 0) {
                    degreesPlayer1 = degreesPlayer1 + 360;
                }
                player1.draw(degreesPlayer1);
            }
            break;
        // Dash '-'
        case 189:
            if(player1.alive) generateLasers('player 1', player1.x, player1.y, degreesPlayer1);
            break;
        default:
            break;
    }
});
// P2 Controlls
addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 2
        // W
        case 87:
            if(player2.alive) player2.move(degreesPlayer2);
            
            break;
        // D  
        case 68:
            if(player2.alive) {
                degreesPlayer2 += 15;
                player2.draw(degreesPlayer2);
            }
            break;
        // A
        case 65:
            if(player2.alive) {
                degreesPlayer2 -= 15;
                player2.draw(degreesPlayer2);
            }
            break;
        // E
        case 69:
            if(player2.alive) generateLasers('player 2', player2.x, player2.y, degreesPlayer2);
            break;
        default:
            break;
    }
});
