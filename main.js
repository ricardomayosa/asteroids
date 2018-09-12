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
var littleAsteroids = [];
var ufos = [];
var lasers = [];
var back = new Background();
back.selectImage();
var player1 = new Player(600,350,60,60,playerImg[0]);
var player2 = new Player(300,350,60,60,playerImg[1]);


var frames = 0;
var interval = setInterval(function(){
    frames++;
    ctx.clearRect(0,0, 1000, 600);
    ctx.strokeRect(0,0,998,598);
    back.draw();
    drawPlayers();
    generateAsteroids();
    drawAsteroids(frames);
    generateUfos();
    drawUfos();
    if(lasers.length > 0) {
        drawLasers();
    }
    if(littleAsteroids.length > 0) {
        drawLittleAsteroids();
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
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            player1.alive = false;
            
        }
        if(player2.collision(asteroid)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            player2.alive = false;
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
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            player1.alive = false;
        }
        if(player2.collision(ufo)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            player2.alive = false;
        }
    });
}
function generateLittleAsteroids(x,y,angle) {
    let littleAsteroid1 = new LittleAsteroid(x, y, angle + 90);
    let littleAsteroid2 = new LittleAsteroid(x, y, angle - 90);
    littleAsteroids.push(littleAsteroid1, littleAsteroid2);
}

function drawLittleAsteroids() {
    littleAsteroids.forEach(function(littleAsteroid) {
        littleAsteroid.draw();
        littleAsteroid.move();
        if(player1.collision(littleAsteroid)) {
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            player1.alive = false;
            
        }
        if(player2.collision(littleAsteroid)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            player2.alive = false;
        }
    });
}

function generateLasers(player,x,y,angle) {
    let laser = new Laser(player,x,y,angle);
    lasers.push(laser);
}

function drawLasers() {
    lasers.forEach(function(laser, laserIndex) {
        laser.draw();
        laser.move();
        if(player1.collision(laser) && laser.player === 'ufo') {
            player1.alive = false;
            console.log('P1 hit by UFO');
            ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
        }
        if(player2.collision(laser) && laser.player === 'ufo') {
            player2.alive = false;
            console.log('P2 hit by UFO');
            ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
        }
        if(asteroids.length > 0) {   
            asteroids.forEach((asteroid, asteroidIndex) => {
                if(asteroid.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        console.log('asteroid hit!');
                        generateLittleAsteroids(asteroid.x, asteroid.y, asteroid.angle);
                        asteroids.splice(asteroidIndex, 1);
                        lasers.splice(laserIndex, 1)
                        if(laser.player === 'player 1') {
                            player1.score += 10;
                        } else if(laser.player === 'player 2') {
                            player2.score += 10;
                        }
                    }
                }
            });
        }
        if(littleAsteroids.length > 0) {   
            littleAsteroids.forEach((littleAsteroid, littleAsteroidIndex) => {
                if(littleAsteroid.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        console.log('little asteroid hit!');
                        littleAsteroids.splice(littleAsteroidIndex, 1);
                        lasers.splice(laserIndex, 1)
                        if(laser.player === 'player 1') {
                            player1.score += 5;
                        } else if(laser.player === 'player 2') {
                            player2.score += 5;
                        }
                    }
                }
            });
        }
        if(ufos.length > 0) {
            ufos.forEach((ufo, ufoIndex) => {
                //console.log(laser);
                //console.log(asteroid.collision(laser));
                if(ufo.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        console.log('ufo hit!');
                        ufos.splice(ufoIndex, 1);
                        lasers.splice(laserIndex, 1)
                        if(laser.player === 'player 1') {
                            player1.score += 15;
                        } else if(laser.player === 'player 1') {
                            player2.score += 15;
                        }
                    }

                    
                    // if(laser.player !== 'ufo') {
                    //     asteroids.splice(index, 1);
                    // }
                }
            });
        }
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
