import { GameInfo } from '@/interfaces/GameInfo';
import { createStore } from 'vuex';

type GameKey = 'targetPractise' | 'calculator' | 'snake' | 'adventura' | 'ticTacToe' | 'randomizer' | 'cookieClicker'; // For proper typing

type AllGames = {
  [key in GameKey]: GameInfo;
};

// TODO add update histories to game descriptions. This could be collapsible. Look at commit history from GitHub (maybe). Make them objects, like: updates: [{ date: ??, message: ?? }, { date: ??, message: ?? }, ...]

const allGames: AllGames = {
  targetPractise: {
    name: '🏹 Target Practise',
    route: '/target-practise',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/target_practise_thumbnail.jpg'),
    thumbnailImgAlt: 'Target Practise app',
    releaseDate: '31.8.2020',
    description: {
      shortDescription: `Shoot targets to get points and try to get as many points as you can.`,
      longDescription:
        `Shoot targets to get points. Get as many points as you can.
Good luck!

**Note:** This is not finished yet and may have bugs.`,
      madeWith: ['Unity', 'C#', 'Blender'],
      support: []
    }
  },
  calculator: {
    name: 'Calculator',
    route: '/calculator',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/calculator_thumbnail.jpg'),
    thumbnailImgAlt: 'Calculator app',
    releaseDate: '5.8.2020',
    googlePlayStoreLink: 'https://play.google.com/store/apps/details?id=com.gamitopia.calculator',
    description: {
      shortDescription: `Calculate, convert units, create charts and graphs, all in one customizable app.`,
      longDescription:
        `*The full version of Calculator is available on the Google Play store for free **[here](https://play.google.com/store/apps/details?id=com.gamitopia.calculator)***
Note: The version here on Gamitopia has very limited features compared to the downloadable app, so make sure to check out the app!

Calculator also has a separate GitHub repository, which you can find **[here](https://github.com/Jondolf/Calculator)**

### The full version [(the Android app version)](https://play.google.com/store/apps/details?id=com.gamitopia.calculator)
The full version has a calculator, many unit converters (including a currency converter), a tool for creating beautiful charts, a graphing calculator and more.
The app has many color themes and customization options, so you can make the app your own.

### The web version (this version)
The web version of Calculator only has the calculator and no customization.
The web version is made with Vue and the app version is made with Ionic Angular, so it would be difficult to keep them both updated.`,
      madeWith: ['Vue (web version), Ionic Angular (Android app version)', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes']
    }
  },
  snake: {
    name: 'Snake',
    route: '/snake',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/snake_thumbnail.jpg'),
    thumbnailImgAlt: 'Snake game',
    releaseDate: '3.1.2020',
    description: {
      shortDescription: `Collect as much fruit as you can by slithering around as a snake. Don't hit your own tail!`,
      longDescription:
        `Snake is a classic game where you move a snake up, down, left or right and try to gather as many fruit as you can whilst trying to avoid hitting walls or slithering into your own tail. As you get more fruit, your tail grows longer making it more and more difficult to get around without hitting your own tail.
Your goal is to get as many fruit as you can. If you hit a wall or your own tail, the snake dies and you will have to try again.

In the settings of the game you can change the size of the board/game area, the speed of your snake, turn on fullscreen and more.

The game works with a keyboard (WASD or arrow keys) or with a touch screen (swipe to change direction).`,
      madeWith: ['Vue', 'HTML', 'CSS', 'TypeScript'],
      support: ['Fullscreen support: yes']
    }
  },
  adventura: {
    name: 'Adventura',
    route: '/adventura',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/adventura_thumbnail.jpg'),
    thumbnailImgAlt: 'Adventura game',
    releaseDate: '24.12.2019',
    description: {
      shortDescription: `Fight enemies and bosses, gather equipment, buy upgrades and travel through the world of Adventura.`,
      longDescription:
        `Fight enemies as you go through the many areas of Adventura while getting stronger and stronger, collecting new gear and weapons.

Adventura is a turn based combat game where you fight enemies and bosses to open new, more difficult areas. To survive in those harder areas, you have to buy upgrades from the shop using the coins you gather from your enemies.

For more detailed instructions, check out the instructions from the game itself.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes']
    }
  },
  ticTacToe: {
    name: 'Tic-Tac-Toe',
    route: '/tic-tac-toe',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/tic_tac_toe_thumbnail.jpg'),
    thumbnailImgAlt: 'Tic-Tac-Toe game',
    releaseDate: '12.10.2019',
    description: {
      shortDescription: `A two-player game where you try to get a row of 3 on a 3x3 grid (with normal settings).`,
      longDescription:
        `Tic-Tac-Toe or Noughts and Crosses is a classic game where you put crosses (X's) or noughts (O's) onto a grid, traditionally a 3x3 grid.

### Instructions
Before starting the game, the two players decide who uses crosses (X's) and who uses noughts (O's).
On a 3x3 grid your goal is to get 3 crosses/noughts in a horizontal, vertical or diagonal row. Whenever a player puts down a cross or a nought the turn switches and the other player gets to put down a cross or a nought.
The player that succeeds wins the game. If all squares on the grid are filled and no-one has gotten a row of 3, the game will be a tie.

For more information about the rules check out the instructions in the game itself.

Currently you can only play the game locally against someone else.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes', 'Dark mode support: yes']
    }
  },
  randomizer: {
    name: 'Randomizer',
    route: '/randomizer',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/randomizer_thumbnail.jpg'),
    thumbnailImgAlt: 'Randomizer game',
    releaseDate: '30.9.2019',
    description: {
      shortDescription: `Click a button to get a random value in a certain category, such as heads or tails or dice roll.`,
      longDescription:
        `In Randomizer you can randomize various different things.
Simply choose what to randomize (open the menu by clicking the button in the top-left corner
and press the button located at the bottom to randomize.

### Things to Randomize
#### Number Range
Get a random number from 0 to 10 (with default settings).
You can move the slider below the randomizer button to change the range of numbers to randomize,
for example 0 to 100 or 0 to 255.  

#### Heads or Tails
Throw a coin to get either heads or tails. This could be useful if you have to decide between two things.
For example, should I eat pizza or lasagna? Heads or tails?

#### Roll Dice
Get a random number (shown on the dice) between 1 and 6. This could be useful, for example,
if you want to play board games but don't have a dice with you.`,
      madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
      support: ['Fullscreen support: yes', 'Dark mode support: no']
    }
  },
  cookieClicker: {
    name: 'Cookie Clicker',
    route: '/cookie-clicker',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg'),
    thumbnailImgAlt: 'Cookie Clicker game',
    releaseDate: '31.8.2019',
    description: {
      shortDescription: `Try to get as many points as you can by clicking a cookie. Buy upgrades to get points faster.`,
      longDescription:
        `Cookie Clicker is a game where you click a cookie to gain points, or in this case, bake cookies.
You can use your baked cookies to buy upgrades, which helps you bake more cookies faster.

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

export default createStore({
  state: {
    allGames: allGames,
    newestGame: newestGame,
    recentGames: recentGames
  }
});
