document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
  
    const gridSize = 20;
    const snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = getRandomFood();
    let score = 0;
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
    }
  
    function drawSnake() {
      ctx.fillStyle = '#00f';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
    }
  
    function drawFood() {
      ctx.fillStyle = '#f00';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
  
    function move() {
      const head = { ...snake[0] };
  
      switch (direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }
  
      snake.unshift(head);
  
      // Check collision with food
      if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = score;
        food = getRandomFood();
      } else {
        snake.pop();
      }
  
      // Check collision with walls or itself
      if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize ||
        checkCollision()
      ) {
        alert('Game Over! Your score: ' + score);
        resetGame();
      }
  
      draw();
    }
  
    function checkCollision() {
      return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    }
  
    function getRandomFood() {
      const x = Math.floor(Math.random() * (canvas.width / gridSize));
      const y = Math.floor(Math.random() * (canvas.height / gridSize));
      return { x, y };
    }
  
    function resetGame() {
      snake.length = 1;
      direction = 'right';
      score = 0;
      scoreElement.innerText = score;
      food = getRandomFood();
      draw();
    }
  
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
      }
    });
  
    setInterval(move, 200);
    draw();
  });
  