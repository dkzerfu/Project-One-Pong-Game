
console.log('Linked....')
let canvas = document.querySelector('.canvas')
canvas.height = 500;
canvas.width = 800;
const c = canvas.getContext('2d')
const image = document.querySelector('#source')

var net;
var user;
var ai;
var timeInterval;

let upArrowPressed = false;
let downArrowPressed = false;
let aiUpArrowPressed = false;
let aiDownArrowPressed = false;

const netWidth = 4;
const netHeight = canvas.height;
const paddleWidth = 10;
const paddleHeight = 100;
const radius = 8;
const velocityX = 4;
const velocityY = 4;
//!RECTANGLE CLASS
class Recangle {
    constructor(x, y, height, width, color, score){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.score = '0'
    }
    render(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height)
    }
}
//!BALL CLASS
class Ball {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.height = 3.5;
        this.width = 7;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
    render(){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, true)
        c.closePath();
        c.fill();
    }
}


//!CREATING OBJECTS
net = new Recangle(canvas.width / 2 - netWidth / 2, 0, netHeight, netWidth, 'blue')
user = new Recangle(10, canvas.height / 2 - paddleHeight / 2, paddleHeight, paddleWidth, 'black')
ai = new Recangle(canvas.width - (paddleWidth + 10), canvas.height / 2 - paddleHeight / 2, paddleHeight, paddleWidth, 'black')
ball = new Ball(canvas.width / 2, canvas.height / 2, radius, 'orange')
net.render()
user.render()
ai.render()
ball.render()
console.log(ball.velocityX)

// TODO gameLoop

function gameLoop(){
    c.clearRect(0, 0, canvas.width, canvas.height)

    net.render();
    user.render();
    ai.render();
    ball.render();
    
    update()
}
timeInterval = setInterval(gameLoop, 1000 / 60)
// TODO update function
function update(){
    //moving the paddle
    if (upArrowPressed && user.y > 0){
        user.y -=8;
    }
    else if (downArrowPressed && (user.y < canvas.height - user.height)){
        user.y +=8;
    }
    // move ai paddle
    if (aiUpArrowPressed && ai.y > 0){
        ai.y -=8
    }
    else if (aiDownArrowPressed && (ai.y < canvas.height - ai.height)){
        ai.y +=8;
    }
    // wall collition detection
    if (ball.y + ball.radius >= canvas.height 
        || ball.y - ball.radius <= 0){
        ball.velocityY = -ball.velocityY;
    
    }
    // if user or ai missed the ball, reset, increment the ball and compare win
    else if(ball.x + ball.radius >= canvas.width){
        ball.velocityX = -ball.velocityX
        // score.play()
        // reset()
        // user.score ++
        if(user.score === 5){
            clearInterval(gameInterval)
            // playAgain()
        }
    }
    if(ball.x - ball.radius < 0){
       ball.velocityX = -ball.velocityX
        //score incriment
        // score.play()
        // ai.score ++
        // reset()
        if(ai.score === 5){
            // clearInterval(gameInterval)
            // playAgain()
        }
            
    }
    //move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY
    //ai paddle movement
    // collision detect on paddle
//    paddleCollitionDetection()
}

function keyDownHandler(event){
    //get the key code
    switch(event.keyCode){
        //up arrow key
    case 87:
    upArrowPressed = true;
    break;
    case 83:
    downArrowPressed = true;
    break;
    case 38:
        console.log('true')
    aiUpArrowPressed = true;
    break;
    case 40:
    aiDownArrowPressed = true;
    break;
    }
    }

function keyUpHandler(event){
//get the key code
    switch(event.keyCode){
//up arrow key
    case 87:
    upArrowPressed = false;
    break;
    case 83:
    downArrowPressed = false;
    break;
    case 38:
        console.log('true')
    aiUpArrowPressed = false;
    break;
    case 40:
    aiDownArrowPressed = false;
    break;
    }
}
