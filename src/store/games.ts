import Vuex from 'vuex';
import Vue from 'vue';
import { GameInfo } from '@/interfaces/GameInfo';

Vue.use(Vuex);

type GameKey =
  /* | 'calculator' | */
  'snake' | 'adventura' | 'ticTacToe' | 'randomizer' | 'cookieClicker'; // For proper typing

type AllGames = {
  [key in GameKey]: GameInfo;
};

// TODO add update histories to game descriptions. This could be collapsible. Look at commit history from GitHub (maybe). Make them objects, like: updates: [{ date: ??, message: ?? }, { date: ??, message: ?? }, ...]

const allGames: AllGames = {
  /*
  calculator: {
    name: 'Calculator',
    route: '/calculator/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/snake_thumbnail.jpg'),
    thumbnailImgAlt: 'Calculator game',
    releaseDate: '3.1.2020',
    description: {
      mainDescription: ``,
      madeWith: [''],
      support: ['']
    }
  },
  */
  snake: {
    name: 'Snake',
    route: '/snake/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/snake_thumbnail.jpg'),
    thumbnailImgAlt: 'Snake game',
    releaseDate: '3.1.2020',
    description: {
      mainDescription: `Snake is a game where you move a snake up, down, left or right and try to gather as many fruit as you can whilst trying to avoid hitting walls or slithering into your own tail. As you get more fruit, your tail grows longer making it more and more difficult to get around without hitting your own tail.
      Your goal is to get as many fruit as you can. If you hit a wall or your own tail, the snake dies and you will have to try again.

      In the settings of the game you can change the size of the board/game area, the speed of your snake, turn on fullscreen and more.
      
      The game works with a keyboard (WASD or arrow keys) or with a touch screen (swipe to change direction).`,
      madeWith: ['Vue', 'HTML', 'CSS', 'TypeScript'],
      support: ['Fullscreen support: yes']
    }
  },
  adventura: {
    name: 'Adventura',
    route: '/adventura/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/adventura_thumbnail.jpg'),
    thumbnailImgAlt: 'Adventura game',
    releaseDate: '24.12.2019',
    description: {
      mainDescription: `Fight enemies as you go through the many areas of Adventura while getting stronger and stronger.

      Adventura is a turn based combat game where you fight enemies and bosses to open new, more difficult areas. To survive in those harder areas, you have to buy upgrades from the shop using the coins you gather from your enemies.
      
      For more detailed instructions, check out the instructions from the game itself.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes']
    }
  },
  ticTacToe: {
    name: 'Tic-Tac-Toe',
    route: '/tic-tac-toe/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/tic_tac_toe_thumbnail.jpg'),
    thumbnailImgAlt: 'Tic-Tac-Toe game',
    releaseDate: '12.10.2019',
    description: {
      mainDescription: `Tic-Tac-Toe or Noughts and Crosses is a game where you put crosses (X's) or noughts (O's) onto a grid, traditionally a 3x3 grid.
      
      On a 3x3 grid your goal is to get 3 crosses/noughts in a horizontal, vertical or diagonal row. Whenever a player puts down a cross or a nought the turn switches and the other player gets to put down a cross or a nought. The player that succeeds wins the game. If all squares on the grid are filled and no-one has gotten a row of 3, the game will be a tie.
      
      For more information about the rules check out the instructions in the game itself.
      
      Currently you can only play the game locally against someone else.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: no', 'Dark mode support: yes']
    }
  },
  randomizer: {
    name: 'Randomizer',
    route: '/randomizer/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/randomizer_thumbnail.jpg'),
    thumbnailImgAlt: 'Randomizer game',
    releaseDate: '30.9.2019',
    description: {
      mainDescription: `Press the button located at the bottom to randomize. Click the menu button to open a small list of things to randomize. Click on a list item and press the randomizer button to randomize.
      
      Number Range: Get a random number from 0 to 10 (with default settings). You can move the slider below the randomizer button to change the range of numbers to randomize, for example 0 to 100 or 0 to 255.  
      Heads or Tails: Get either heads or tails. This could be useful if you have to decide between two things. For example, should I eat pizza or lasagna? Heads or tails?
      Roll Dice: Get a random number (shown on the dice) between 1 and 6. This could be useful, for example, if you want to play board games but don't have a dice with you.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes', 'Dark mode support: no']
    }
  },
  cookieClicker: {
    name: 'Cookie Clicker',
    route: '/cookie-clicker/',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg'),
    thumbnailImgAlt: 'Cookie Clicker game',
    releaseDate: '31.8.2019',
    description: {
      mainDescription: `Click the cookie to bake cookies. Use your baked cookies to buy upgrades. Upgrades help you bake more cookies faster.
      Try to bake as many cookies as you can!`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes', 'Dark mode support: yes']
    }
  }
};

const newestGame = allGames[Object.keys(allGames)[0] as GameKey] as GameInfo;
const recentGames = [
  // Object.keys() required to get index of object property
  allGames[Object.keys(allGames)[0] as GameKey],
  allGames[Object.keys(allGames)[1] as GameKey],
  allGames[Object.keys(allGames)[2] as GameKey]
] as GameInfo[];

export default new Vuex.Store({
  state: {
    allGames: allGames,
    newestGame: newestGame,
    recentGames: recentGames
  }
});
