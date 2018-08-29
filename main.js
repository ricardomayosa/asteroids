var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeRect(0,0,canvas.clientWidth, canvas.height);

var back = new Background();
back.selectImage();
back.draw();
// var frames = 0;
// var interval = setInterval(function(){
//     frames++;
//     ctx.clearRect(0,0, 400, 200);
//     back.draw();
// }, 1000/60);