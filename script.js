const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const unit = 25;
let direction = 'RIGHT';
let snake = [{x: 4 * unit, y: 4 * unit}];
let food = {x: Math.floor(Math.random() * (canvas.width / unit)) * unit, y: Math.floor(Math.random() * (canvas.height / unit)) * unit};

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (keyPressed === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (keyPressed === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (keyPressed === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unit, unit);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= unit;
    if (direction === 'UP') snakeY -= unit;
    if (direction === 'RIGHT') snakeX += unit;
    if (direction === 'DOWN') snakeY += unit;

    if (snakeX === food.x && snakeY === food.y) {
        food = {x: Math.floor(Math.random() * (canvas.width / unit)) * unit, y: Math.floor(Math.random() * (canvas.height / unit)) * unit};
    } else {
        snake.pop();
    }

    const newHead = {x: snakeX, y: snakeY};
    snake.unshift(newHead);

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }
}

function collision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

const game = setInterval(draw, 100);
