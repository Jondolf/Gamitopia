export const game = {
  board: [
    '##############################',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#            ####            #',
    '#            ####            #',
    '#            ####            #',
    '#            ####            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '#                            #',
    '##############################'
  ],
  wallColor: 'white',
  boardColor: 'black',
  gameOver: false,
  score: 0,
  tickNumber: 0,
  tickSpeed: 500,
  timer: 0,
  timesMoved: 0,
  paused: false,
  keyPressListener: null as ((ev: KeyboardEvent) => void) | null,

  startGame(
    gameArea: HTMLElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    if (this.keyPressListener != null) {
      gameArea.removeEventListener('keydown', this.keyPressListener);
    }
    this.keyPressListener = this.processInput.bind(game, canvas, ctx);

    gameArea.addEventListener('keydown', this.keyPressListener);
    this.tick(canvas, ctx);
    fruit.addFruit();
  },

  pauseGame() {
    window.clearTimeout(this.timer);
  },

  resetGame(
    gameArea: HTMLElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.gameOver = false;
    this.score = 0;
    this.timesMoved = 0;
    this.tickNumber = 0;
    snake.facing = 'E';
    if (localStorage.getItem('snakeSpeed') !== null) {
      this.tickSpeed = +localStorage.getItem('snakeSpeed')!!;
    } else {
      this.tickSpeed = 500;
    }
    this.timer = 0;
    snake.parts = [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }];
    fruit.fruitArray = [{}];
    graphics.drawGame(canvas, ctx);
    this.startGame(gameArea, canvas, ctx);
  },

  tick(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    if (!this.gameOver) {
      window.clearTimeout(this.timer);
      let result = snake.move();
      if (result === 'Game over') {
        return;
      }

      this.tickNumber++;
      if (this.tickNumber % 10 === 0) {
        fruit.addFruit();
      }

      graphics.drawGame(canvas, ctx);
      this.timesMoved++;
      this.timer = setTimeout(() => {
        this.tick(canvas, ctx);
      }, this.tickSpeed);
    }
  },

  processInput(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: KeyboardEvent
  ) {
    let key = event.key;
    let direction = snake.facing;

    if (
      (key === 'w' || key === 'KeyW' || key === 'ArrowUp') &&
      direction !== 'S'
    ) {
      direction = 'N';
    } else if (
      (key === 'a' || key === 'KeyA' || key === 'ArrowLeft') &&
      direction !== 'E'
    ) {
      direction = 'W';
    } else if (
      (key === 's' || key === 'KeyS' || key === 'ArrowDown') &&
      direction !== 'N'
    ) {
      direction = 'S';
    } else if (
      (key === 'd' || key === 'KeyD' || key === 'ArrowRight') &&
      direction !== 'W'
    ) {
      direction = 'E';
    }
    if (
      key !== 'p' &&
      (key === 'w' ||
        key === 'a' ||
        key === 's' ||
        key === 'd' ||
        key === 'ArrowUp' ||
        key === 'ArrowLeft' ||
        key === 'ArrowDown' ||
        key === 'ArrowRight')
    ) {
      event.preventDefault();
      snake.facing = direction;
      this.tick(canvas, ctx);
      this.paused = false;
    } else if (key === 'p' && !this.paused) {
      this.pauseGame();
      this.paused = true;
    } else if (key === 'p' && this.paused) {
      this.tick(canvas, ctx);
      this.paused = false;
    }
  },

  // collision detection
  isEmpty(location: any) {
    return this.board[location.y][location.x] === ' ';
  },

  isWall(location: any) {
    return this.board[location.y][location.x] === '#';
  },

  isFruit(location: any) {
    for (
      let fruitNumber = 0;
      fruitNumber < fruit.fruitArray.length;
      fruitNumber++
    ) {
      let fruitFromArray = fruit.fruitArray[fruitNumber] as any;
      if (location.x === fruitFromArray.x && location.y === fruitFromArray.y) {
        fruit.fruitArray.splice(fruitNumber, 1);
        return true;
      }
    }
    return false;
  },
  isSnake(location: any) {
    for (let snakePart = 0; snakePart < snake.parts.length; snakePart++) {
      let part = snake.parts[snakePart];
      if (location.x === part.x && location.y === part.y) {
        return true;
      }
    }
    return false;
  }
};

export const snake = {
  color: 'rgb(0, 255, 0)',
  parts: [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }],
  facing: 'E',

  nextLocation() {
    let snakeHead = this.parts[0];
    let nextXLocation = snakeHead.x;
    let nextYLocation = snakeHead.y;

    nextXLocation = this.facing === 'W' ? nextXLocation - 1 : nextXLocation;
    nextXLocation = this.facing === 'E' ? nextXLocation + 1 : nextXLocation;
    nextYLocation = this.facing === 'N' ? nextYLocation - 1 : nextYLocation;
    nextYLocation = this.facing === 'S' ? nextYLocation + 1 : nextYLocation;

    return { x: nextXLocation, y: nextYLocation };
  },

  move() {
    game.paused = false;
    if (!game.gameOver) {
      let location = this.nextLocation();

      if (game.isWall(location) || game.isSnake(location)) {
        game.gameOver = true;
        if (
          !localStorage.getItem('snakeMostMoves') ||
          game.timesMoved > JSON.parse(localStorage.getItem('snakeMostMoves')!!)
        ) {
          localStorage.setItem(
            'snakeMostMoves',
            JSON.stringify(game.timesMoved)
          );
        }
        if (
          !localStorage.getItem('snakeLeastMoves') ||
          game.timesMoved <
            JSON.parse(localStorage.getItem('snakeLeastMoves')!!)
        ) {
          localStorage.setItem(
            'snakeLeastMoves',
            JSON.stringify(game.timesMoved)
          );
        }

        return 'Game over';
      }

      if (game.isEmpty(location)) {
        this.parts.unshift(location);
        this.parts.pop();
      }

      if (game.isFruit(location)) {
        snake.parts.unshift(location);
        game.score++;
        if (
          !localStorage.getItem('snakeHiscore') ||
          game.score > JSON.parse(localStorage.getItem('snakeHiscore')!!)
        ) {
          localStorage.setItem('snakeHiscore', JSON.stringify(game.score));
        }
        let fruitPickupSound = new Audio(
          require('@/assets/sound/item-pickup-sound.mp3')
        );
        fruitPickupSound.play();
      }
    }
  }
};

export const fruit = {
  color: 'rgb(255, 0, 0)',
  fruitArray: [{}],

  addFruit() {
    let randomY = Math.floor(Math.random() * game.board.length);
    let randomX = Math.floor(Math.random() * game.board[randomY].length);
    let randomLocation = { x: randomX, y: randomY };

    if (
      game.isEmpty(randomLocation) &&
      !game.isFruit(randomLocation) &&
      !game.isSnake(randomLocation)
    ) {
      this.fruitArray.push(randomLocation);
    } else {
      fruit.addFruit();
    }
  }
};

export const graphics = {
  squareSize: 15,

  drawBoard(ctx: CanvasRenderingContext2D) {
    let currentYOffset = 0; // position on the y-axis

    for (let line of game.board) {
      //line = line.split('');
      let currentXOffset = 0; // position on the x-axis

      for (let char of line) {
        if (char === '#') {
          ctx.fillStyle = game.wallColor;
          ctx.fillRect(
            currentXOffset,
            currentYOffset,
            graphics.squareSize,
            graphics.squareSize
          );
        } else {
          ctx.fillStyle = game.boardColor;
          ctx.fillRect(
            currentXOffset,
            currentYOffset,
            graphics.squareSize,
            graphics.squareSize
          );
        }
        currentXOffset += graphics.squareSize;
      }
      currentYOffset += graphics.squareSize;
    }
  },

  drawOnBoard(ctx: CanvasRenderingContext2D, whatToDraw: any, color: string) {
    for (let part of whatToDraw) {
      let partXLocation = part.x * graphics.squareSize;
      let partYLocation = part.y * graphics.squareSize;

      ctx.fillStyle = color;
      ctx.fillRect(
        partXLocation,
        partYLocation,
        graphics.squareSize,
        graphics.squareSize
      );
    }
  },

  drawGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    this.drawBoard(ctx);
    this.drawOnBoard(ctx, fruit.fruitArray, fruit.color); // fruit drawn before snake to prevent fruit spawning on top of snake
    this.drawOnBoard(ctx, snake.parts, snake.color);
  }
};
