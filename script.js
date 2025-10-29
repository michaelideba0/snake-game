const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction;
let food = generateFood();
let score = 0;
let game;

document.addEventListener("keydown", setDirection);
restartBtn.addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = undefined;
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  clearInterval(game);
  game = setInterval(draw, 150);
}

function setDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 400, 400);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#0a0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#111";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  if (headX === food.x && headY === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

  let newHead = { x: headX, y: headY };

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Your score: " + score);
    return;
  }

  snake.unshift(newHead);
  scoreDisplay.textContent = "Score: " + score;
}

function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}

// Start game on load
startGame();