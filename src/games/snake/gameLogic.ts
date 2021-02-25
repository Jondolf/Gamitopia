interface Coordinate {
  x: number;
  y: number;
}
class Snake {
  constructor(
    public color: string,
    public parts: Coordinate[],
    public facing: string,
    private game: Game
  ) { }

  nextLocation() {
    const snakeHead = this.parts[0];
    let nextXLocation = snakeHead.x;
    let nextYLocation = snakeHead.y;

    nextXLocation = this.facing === 'W' ? nextXLocation - 1 : nextXLocation;
    nextXLocation = this.facing === 'E' ? nextXLocation + 1 : nextXLocation;
    nextYLocation = this.facing === 'N' ? nextYLocation - 1 : nextYLocation;
    nextYLocation = this.facing === 'S' ? nextYLocation + 1 : nextYLocation;

    return { x: nextXLocation, y: nextYLocation };
  }

  move() {
    this.game.paused = false;
    if (!this.game.gameOver) {
      const location = this.nextLocation();

      if (this.game.isWall(location) || this.game.isSnake(location)) {
        this.game.gameOver = true;
        if (
          !localStorage.getItem('snakeMostMoves') ||
          this.game.timesMoved >
          JSON.parse(localStorage.getItem('snakeMostMoves')!!)
        ) {
          localStorage.setItem(
            'snakeMostMoves',
            JSON.stringify(this.game.timesMoved)
          );
        }
        if (
          !localStorage.getItem('snakeLeastMoves') ||
          this.game.timesMoved <
          JSON.parse(localStorage.getItem('snakeLeastMoves')!!)
        ) {
          localStorage.setItem(
            'snakeLeastMoves',
            JSON.stringify(this.game.timesMoved)
          );
        }

        return 'Game over';
      }

      if (this.game.isEmpty(location)) {
        this.parts.unshift(location);
        this.parts.pop();
      }

      if (this.game.isFruit(location)) {
        this.parts.unshift(location);
        this.game.score++;
        if (
          !localStorage.getItem('snakeHiscore') ||
          this.game.score > JSON.parse(localStorage.getItem('snakeHiscore')!!)
        ) {
          localStorage.setItem('snakeHiscore', JSON.stringify(this.game.score));
        }
        const fruitPickupSound = new Audio(
          require('@/assets/sound/item-pickup-sound.mp3')
        );
        fruitPickupSound.play();
      }
    }
  }
}

class Fruit {
  constructor(
    public color: string,
    public fruitArray: Coordinate[] | object[],
    private game: Game
  ) { }

  addFruit() {
    const randomY = Math.floor(
      Math.random() * this.game.gameBoard.board.length
    );
    const randomX = Math.floor(
      Math.random() * this.game.gameBoard.board[randomY].length
    );
    const randomLocation: Coordinate = { x: randomX, y: randomY };

    if (
      this.game.isEmpty(randomLocation) &&
      !this.game.isFruit(randomLocation) &&
      !this.game.isSnake(randomLocation)
    ) {
      this.fruitArray.push(randomLocation);
    } else {
      this.addFruit();
    }
  }
}

class Graphics {
  constructor(
    public squareSize: number,
    private game: Game,
    private snake: Snake,
    private fruit: Fruit
  ) { }

  drawGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    this.drawBoard(ctx);
    this.drawOnBoard(ctx, this.fruit.fruitArray, this.fruit.color); // Fruit drawn before snake to prevent fruit spawning on top of snake
    this.drawOnBoard(ctx, this.snake.parts, this.snake.color);
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    let currentYOffset = 0; // Position on the y-axis

    for (const line of this.game.gameBoard.board) {
      let currentXOffset = 0; // Position on the x-axis

      for (const char of line) {
        if (char === '#') {
          ctx.fillStyle = this.game.gameBoard.wallColor;
          ctx.fillRect(
            currentXOffset,
            currentYOffset,
            this.squareSize,
            this.squareSize
          );
        } else {
          ctx.fillStyle = this.game.gameBoard.boardColor;
          ctx.fillRect(
            currentXOffset,
            currentYOffset,
            this.squareSize,
            this.squareSize
          );
        }
        currentXOffset += this.squareSize;
      }
      currentYOffset += this.squareSize;
    }
  }

  drawOnBoard(ctx: CanvasRenderingContext2D, whatToDraw: any, color: string) {
    for (const part of whatToDraw) {
      const partXLocation = part.x * this.squareSize;
      const partYLocation = part.y * this.squareSize;

      ctx.fillStyle = color;
      ctx.fillRect(
        partXLocation,
        partYLocation,
        this.squareSize,
        this.squareSize
      );
    }
  }
}

export class Game {
  public snake: Snake;
  public fruit: Fruit;
  public graphics: Graphics;

  constructor(
    public gameBoard: {
      board: string[];
      wallColor: string;
      boardColor: string;
    },
    public gameOver: boolean,
    public score: number,
    public tickNumber: number,
    public tickSpeed: number,
    public timer: number,
    public timesMoved: number,
    public paused: boolean,
    private keyPressListener: ((ev: KeyboardEvent) => void) | null
  ) {
    this.snake = new Snake(
      'rgb(0, 255, 0)',
      [
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 }
      ],
      'E',
      this
    );

    this.fruit = new Fruit('rgb(255, 0, 0)', [{} as Coordinate], this);
    this.graphics = new Graphics(15, this, this.snake, this.fruit);
  }

  startGame(
    gameArea: HTMLElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    if (this.keyPressListener != null) {
      gameArea.removeEventListener('keydown', this.keyPressListener);
    }
    this.keyPressListener = this.processInput.bind(this, canvas, ctx);

    gameArea.addEventListener('keydown', this.keyPressListener);
    this.tick(canvas, ctx);
    this.fruit.addFruit();
  }

  pauseGame() {
    window.clearTimeout(this.timer);
  }

  resetGame(
    gameArea: HTMLElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.gameOver = false;
    this.score = 0;
    this.timesMoved = 0;
    this.tickNumber = 0;
    this.snake.facing = 'E';
    if (localStorage.getItem('snakeSpeed') !== null) {
      this.tickSpeed = +localStorage.getItem('snakeSpeed')!!;
    } else {
      this.tickSpeed = 500;
    }
    this.timer = 0;
    this.snake.parts = [
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 5 }
    ];
    this.fruit.fruitArray = [{}];
    this.graphics.drawGame(canvas, ctx);
    this.startGame(gameArea, canvas, ctx);
  }

  tick(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    if (!this.gameOver) {
      window.clearTimeout(this.timer);
      const result = this.snake.move();
      if (result === 'Game over') {
        return;
      }

      this.tickNumber++;
      if (this.tickNumber % 10 === 0) {
        this.fruit.addFruit();
      }

      this.graphics.drawGame(canvas, ctx);
      this.timesMoved++;
      this.timer = setTimeout(() => {
        this.tick(canvas, ctx);
      }, this.tickSpeed) as unknown as number; // Without this it threw an error during build
    }
  }

  processInput(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: KeyboardEvent
  ) {
    const key = event.key;
    let direction = this.snake.facing;

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
      this.snake.facing = direction;
      this.tick(canvas, ctx);
      this.paused = false;
    } else if (key === 'p' && !this.paused) {
      this.pauseGame();
      this.paused = true;
    } else if (key === 'p' && this.paused) {
      this.tick(canvas, ctx);
      this.paused = false;
    }
  }

  // Collision detection
  isEmpty(location: any) {
    return this.gameBoard.board[location.y][location.x] === ' ';
  }

  isWall(location: any) {
    return this.gameBoard.board[location.y][location.x] === '#';
  }

  isFruit(location: any) {
    for (
      let fruitNumber = 0;
      fruitNumber < this.fruit.fruitArray.length;
      fruitNumber++
    ) {
      const fruitFromArray = this.fruit.fruitArray[fruitNumber] as any;
      if (location.x === fruitFromArray.x && location.y === fruitFromArray.y) {
        this.fruit.fruitArray.splice(fruitNumber, 1);
        return true;
      }
    }
    return false;
  }
  isSnake(location: any) {
    for (let snakePart = 0; snakePart < this.snake.parts.length; snakePart++) {
      const part = this.snake.parts[snakePart];
      if (location.x === part.x && location.y === part.y) {
        return true;
      }
    }
    return false;
  }
}
