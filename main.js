// Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// Images
var playerImg   = ['./images/player1.png', './images/player2.png'];
var asteroidImg = './images/asteroid.png';
var ufoImg      = './images/ufo.png';
// Audio
var backgroundSound = new Audio();
backgroundSound.src = './sounds/AsteroidBelt.mp3';
var ufoSound        = new Audio();
ufoSound.src        = './sounds/XFilesTheme.mp3';
var laserSound      = new Audio();
laserSound.src      = './sounds/laser.mp3';
var playerExplosion = new Audio();
playerExplosion.src = './sounds/explosion.mp3';
var asteroidExpl    = new Audio();
asteroidExpl.src    = './sounds/asteroidExplosion.mp3';
// Initial scores
var degreesPlayer1 = 0;
var degreesPlayer2 = 0;
// Arrays
var asteroids       = [];
var littleAsteroids = [];
var ufos            = [];
var lasers          = [];
// Select random background image
var back = new Background();
// Keys
// var map = {
//      65:  false
//     ,68:  false 
//     ,69:  false
//     ,87:  false
//     ,37:  false
//     ,38:  false
//     ,39:  false
//     ,189: false
// };
var map = {};
// Generate players
var player2 = new Player(800,350,60,60,playerImg[0]);
var player1 = new Player(300,350,60,60,playerImg[1]);
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        ufoSound.pause();
        backgroundSound.currentTime = 0;
        backgroundSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        backgroundSound.play();
        document.getElementById("start-button").disabled = true;
        score = 0;
        startGame();
    };
}
function startGame() {
    console.log('starting game');
    // Setting default initial state
    ctx.clearRect(0,0, 1000, 600);
    back.selectImage();
    degreesPlayer1 = 0;
    degreesPlayer2 = 0;
    player1.alive = true;
    player2.alive = true;
    player1.score = 0;
    player2.score = 0;
    player1.x = 300;
    player2.x = 600;
    player1.y = 350;
    player2.y = 350;
    asteroids = [];
    littleAsteroids = [];
    ufos = [];
    lasers = [];
    var frames = 0;
    // Animation
    var interval = setInterval(function(){
        frames++;
        ctx.clearRect(0,0, 1000, 600);
        //ctx.strokeRect(0,0,998,598);
        back.draw();
        drawPlayers(interval);
        generateAsteroids(frames);
        drawAsteroids(frames);
        generateUfos(frames);
        drawUfos(frames);
        if(lasers.length > 0) {
            drawLasers();
        }
        if(littleAsteroids.length > 0) {
            drawLittleAsteroids();
        }
        ctx.font = "20px Avenir";
        ctx.fillStyle = "white"
        ctx.fillText("Player 1: " + player1.score, 20, 570);
        ctx.fillText("Player 2: " + player2.score, 850, 570);
    }, 1000/60);
}
// Draw player's ship if player is still alive
function drawPlayers(interval) {
    if(player1.alive && player2.alive) {
        player1.draw(degreesPlayer1);
        player2.draw(degreesPlayer2);
    } else if(player1.alive && !player2.alive) {
        player1.draw(degreesPlayer1);
    } else if(!player1.alive && player2.alive) {
        player2.draw(degreesPlayer2);
    } else {
        // Stop if both players are dead
        console.log(back.image.src);
        backgroundSound.pause();
        ufoSound.currentTime = 0;
        ufoSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        ufoSound.play();
        clearInterval(interval);
        document.getElementById("start-button").disabled = false;
        ctx.font = "90px Avenir";
        ctx.fillStyle = "white"
        ctx.fillText("GAME OVER", 250, 300);
        if(player1.score > player2.score) {
            ctx.font = "40px Avenir";
            ctx.fillText("PLAYER 1 WINS!", 370, 400);
        } else if(player2.score > player1.score) {
            ctx.font = "40px Avenir";
            ctx.fillText("PLAYER 2 WINS!", 370, 400);
        } else {
            ctx.font = "40px Avenir";
            ctx.fillText("IT'S A TIE!", 400, 400);
        }
    }
}
// Generate and add asteroids to asteroids array
function generateAsteroids(frames) {
    //console.log('creain asteroidz');
    if (frames % 140 === 0) {
        let asteroid = new Asteroid(asteroidImg);
        asteroids.push(asteroid);
    }
}
// Animate asteroids
function drawAsteroids() {
    asteroids.forEach((asteroid) => {
        asteroid.draw();
        asteroid.move();
        // Check collision with player 1
        if(player1.collision(asteroid)) {
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            //playerExplosion.pause();
            playerExplosion.currentTime = 1;
            playerExplosion.play();
            player1.alive = false;
        }
        // Check collision with player 2
        if(player2.collision(asteroid)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            //playerExplosion.pause();
            playerExplosion.currentTime = 1;
            playerExplosion.play();
            player2.alive = false;
        }
    });
}
// Generate and add ufo to ufos array
function generateUfos(frames) {
    if (frames % 2600 === 0) {
        let ufo = new Ufo(ufoImg);
        ufos.push(ufo);
    }
}
// Animate ufos
function drawUfos(frames) {
    ufos.forEach((ufo) => {
        ufo.draw();
        ufo.move();
        if (frames % 100 === 0) {
            ufo.shoot('ufo');
        }
        // Check collision with player 1
        if(player1.collision(ufo)) {
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            playerExplosion.play();
            player1.alive = false;
        }
        // Check collision with player 2
        if(player2.collision(ufo)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            playerExplosion.play();
            player2.alive = false;
        }
    });
}
// Generate and add two little asteroids to littleAsteroids array
function generateLittleAsteroids(x,y,angle) {
    // Small asteroids move in oposite directions
    let littleAsteroid1 = new LittleAsteroid(x, y, angle + 90);
    let littleAsteroid2 = new LittleAsteroid(x, y, angle - 90);
    littleAsteroids.push(littleAsteroid1, littleAsteroid2);
}
// Animate little asteroids
function drawLittleAsteroids() {
    littleAsteroids.forEach((littleAsteroid) => {
        littleAsteroid.draw();
        littleAsteroid.move();
        // Check collision with player 1
        if(player1.collision(littleAsteroid)) {
            if(player1.alive) ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            playerExplosion.play();
            player1.alive = false;
        }
        // Check collision with player 2
        if(player2.collision(littleAsteroid)) {
            if(player2.alive) ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            playerExplosion.play();
            player2.alive = false;
        }
    });
}
// Generate and add laser to lasers array
function generateLasers(player,x,y,angle) {
    let laser = new Laser(player,x,y,angle);
    lasers.push(laser);
    laserSound.play();
}
// Animate laser
function drawLasers() {
    lasers.forEach((laser, laserIndex) => {
        laser.draw();
        laser.move();
        //laserSound.play();
        // Check collision of ufo's laser with player 1
        if(player1.collision(laser) && laser.player === 'ufo') {
            player1.alive = false;
            ctx.drawImage(player1.explosion, player1.x, player1.y, 300, 150);
            playerExplosion.play();
        }
        // Check collision of ufo's laser with player 2
        if(player2.collision(laser) && laser.player === 'ufo') {
            player2.alive = false;
            ctx.drawImage(player2.explosion, player2.x, player2.y, 300, 150);
            playerExplosion.play();
        }
        // Check collision of player's laser with asteroid
        if(asteroids.length > 0) {   
            asteroids.forEach((asteroid, asteroidIndex) => {
                if(asteroid.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        // Asteroid fragments into two smaller asteroids
                        generateLittleAsteroids(asteroid.x, asteroid.y, asteroid.angle);
                        asteroids.splice(asteroidIndex, 1);
                        lasers.splice(laserIndex, 1);
                        asteroidExpl.play();
                        // Add score to each player
                        if(laser.player === 'player 1') {
                            player1.score += 10;
                        } else if(laser.player === 'player 2') {
                            player2.score += 10;
                        }
                    }
                }
            });
        }
        // Check collision of player's laser with little asteroid
        if(littleAsteroids.length > 0) {   
            littleAsteroids.forEach((littleAsteroid, littleAsteroidIndex) => {
                if(littleAsteroid.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        littleAsteroids.splice(littleAsteroidIndex, 1);
                        lasers.splice(laserIndex, 1)
                        asteroidExpl.play();
                        // Add score to each player
                        if(laser.player === 'player 1') {
                            player1.score += 5;
                        } else if(laser.player === 'player 2') {
                            player2.score += 5;
                        }
                    }
                }
            });
        }
        // Check collision of player's laser with ufo
        if(ufos.length > 0) {
            ufos.forEach((ufo, ufoIndex) => {
                if(ufo.collision(laser)) {
                    if(laser.player !== 'ufo') {
                        ufos.splice(ufoIndex, 1);
                        lasers.splice(laserIndex, 1)
                        // Add score to each player
                        if(laser.player === 'player 1') {
                            player1.score += 15;
                        } else if(laser.player === 'player 1') {
                            player2.score += 15;
                        }
                    }
                }
            });
        }
    });
}
// Simultaneous controlls
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
    
//     if(map[38] && map[87] && map[189] && map[69]) {
//         console.log('buth up');
//         if(player1.alive && player2.alive) {
//             player1.move(degreesPlayer1);
//             generateLasers('player 1', player1.x, player1.y, degreesPlayer1);
//             player2.move(degreesPlayer2);
//             generateLasers('player 2', player2.x, player2.y, degreesPlayer2);
//         }
//     } else if(map[38] && map[87]) {
//         if(player1.alive && player2.alive) {
//             player1.move(degreesPlayer1);
//             player2.move(degreesPlayer2);
//         }   
//     } else if(map[38]) {
//         if(player1.alive) player1.move(degreesPlayer1);
//     } else if(map[87]) {
//         if(player2.alive) player2.move(degreesPlayer2);
//     }
// }
// P2 Controlls
addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 1
        // Up Arrow
        case 38:
            if(player2.alive) player2.move(degreesPlayer1);
            break;
        // Right Arrow    
        case 39:
            if(player2.alive) {
                degreesPlayer2 += 15;
                if(degreesPlayer2 === 360) {
                    degreesPlayer2 = 0;
                } else if(degreesPlayer2 > 360) {
                    degreesPlayer2 = degreesPlayer2 - 360;
                }
                player2.draw(degreesPlayer2);
            }
            break;
        // Left Arrow
        case 37:
            if(player2.alive) {
                degreesPlayer2 -= 15;
                if(degreesPlayer2 === 360) {
                    degreesPlayer2 = 0;
                } else if(degreesPlayer2 < 0) {
                    degreesPlayer2 = degreesPlayer2 + 360;
                }
                player2.draw(degreesPlayer2);
            }
            break;
        // Dash 'shift'
        case 16:
            if(player2.alive) generateLasers('player 2', player2.x, player2.y, degreesPlayer2);
            break;
        default:
            break;
    }
});
// P1 Controlls
addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        // PLAYER 2
        // W
        case 87:
            if(player1.alive) player1.move(degreesPlayer1);
            break;
        // D  
        case 68:
            if(player1.alive) {
                degreesPlayer1 += 15;
                player1.draw(degreesPlayer1);
            }
            break;
        // A
        case 65:
            if(player1.alive) {
                degreesPlayer1 -= 15;
                player1.draw(degreesPlayer1);
            }
            break;
        // E
        case 69:
            if(player1.alive) generateLasers('player 1', player1.x, player1.y, degreesPlayer1);
            break;
        default:
            break;
    }
});
