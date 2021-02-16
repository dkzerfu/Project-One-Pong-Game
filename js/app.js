
let container = document.querySelector('.container')
let easyButton = document.querySelector('.easy')
let mediumButton = document.querySelector('.medium')
let hardButton = document.querySelector('.hard')
let levelContainer = document.querySelector('.level')
let body = document.querySelector('body')
var hit = document.querySelector('#hit');
var score = document.querySelector('#score')
const image = document.querySelector('#source')

let canvas = document.querySelector('.canvas')
canvas.height = 500;
canvas.width = 800;
const c = canvas.getContext('2d')


document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
// console.log(show)
easyButton.addEventListener('click', function(){
    hit.play()
    container.innerHTML = ''
    creatingPlayButton()
})
mediumButton.addEventListener('click', function(){
    hit.play()
    container.innerHTML = ''
    ball.velocityX = 6;
    ball.velocityY = 6;
    creatingPlayButton()
})
hardButton.addEventListener('click', function(){
    hit.play()
    container.innerHTML = ''
    ball.velocityX = 8;
    ball.velocityY = 8;
    creatingPlayButton()
})



var sound;
var hitSound;
var gameInterval;

const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;
let aiUpArrowPressed = false;
let aiDownArrowPressed = false;

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
        this.velocityX = 4;
        this.velocityY = 4;
    }
    render(){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, true)
        c.closePath();
        c.fill();
    }
}
function drewScore(x, y, score){
    c.fillStyle = 'white';
    c.font = '35px sans-serif';
    c.fillText(score, x, y);
}

//!CREATING OBJECTS
net = new Recangle(canvas.width / 2 - netWidth / 2, 0, netHeight, netWidth, 'white')
user = new Recangle(10, canvas.height / 2 - paddleHeight / 2, paddleHeight, paddleWidth, 'white')
ai = new Recangle(canvas.width - (paddleWidth + 10), canvas.height / 2 - paddleHeight / 2, paddleHeight, paddleWidth, 'white')
ball = new Ball(canvas.width / 2, canvas.height / 2, 8, 'white')

// gameLoop function
// inside gameLoop finction
// update function
// render function
function gameLoop(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(image,0, 0, canvas.width, canvas.height)
    drewScore(canvas.width / 4, canvas.height / 6, user.score)
    drewScore(3 * canvas.width / 4, canvas.height / 6, ai.score)

    if(userDetectHit(ball, user)){
        hit.play()
        ball.velocityX = -ball.velocityX
    }
    if(aiDetectHit(ball, ai)){
        hit.play()
        ball.velocityX = -ball.velocityX
    }
    net.render();
    user.render();
    ai.render();
    ball.render();
    
    update()
}

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
        score.play()
        reset()
        user.score ++
        if(user.score === 5){
            clearInterval(gameInterval)
            playAgain()
        }
    }
    if(ball.x - ball.radius < 0){
        //score incriment
        score.play()
        ai.score ++
        reset()
        if(ai.score === 5){
            clearInterval(gameInterval)
            playAgain()
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
        // console.log('true')
    aiUpArrowPressed = false;
    break;
    case 40:
    aiDownArrowPressed = false;
    break;
    }
}

function userDetectHit(obj1, obj2) {
    if (obj1.x - obj1.radius < obj2.x + obj2.width
        && obj1.x - obj1.radius + obj1.width > obj2.x
        && obj1.y - obj1.radius < obj2.y + obj2.height
        && obj1.y - obj1.radius + obj1.height > obj2.y) {
        
        return true
    }
}
function aiDetectHit(obj1, obj2) {
    if (obj1.x + obj1.radius < obj2.x + obj2.width
        && obj1.x + obj1.radius + obj1.width > obj2.x
        && obj1.y + obj1.radius < obj2.y + obj2.height
        && obj1.y + obj1.radius + obj1.height > obj2.y) {

        return true
    }
}
// console.log(calculateDistance(ball.x, ball.y, user.x, user.y))
// reset the ball
function reset() {
    // reset ball's value to older values
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    // user paddle to the oldest value
    user.x = 10,
    user.y = canvas.height / 2 - paddleHeight / 2,
    // ai paddle to the oldest value
    ai.x = canvas.width - (paddleWidth + 10),
    ai.y = canvas.height / 2 - paddleHeight / 2,
    // changes the direction of ball
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}
// creating the play button
function creatingPlayButton (){
    let div = document.createElement('div')
    let button = document.createElement('button')
    let instraction = document.createElement('h2')
    instraction.classList = 'instraction'
    instraction.innerText = 'PRESS PLAY TO BEGIN'
    div.appendChild(instraction)
    button.classList = 'start'
    button.addEventListener('click', function(){
        hit.play()
        container.classList.add('hidden')
        gameInterval = setInterval(gameLoop, 1000 / 60)
    })
    button.innerText = 'PLAY'
    div.appendChild(button)
    container.appendChild(div)
}
function playAgain(){
    let restart = document.createElement('button')
    restart.classList = 'restart'
    restart.innerText = 'RESTART'
    container.innerText = ''
    container.classList.remove('hidden')
    restart.addEventListener('click', function(){
        container.classList.add('hidden')
        gameInterval = setInterval(gameLoop, 1000 / 60)
        user.score = 0;
        ai.score = 0;
        reset()
    })
    container.appendChild(restart)

}
// console.log(score)
function playAudio(){
    hit.play()
    score.play()
}

