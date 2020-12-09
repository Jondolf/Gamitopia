// @ts-ignore
import adventuraDescription from '@/components/games/adventura/README.md';
// @ts-ignore
import calculatorDescription from '@/components/games/calculator/README.md';
// @ts-ignore
import cookieClickerDescription from '@/components/games/cookie-clicker/README.md';
// @ts-ignore
import inTheShadowsDescription from '@/components/games/in-the-shadows/README.md';
// @ts-ignore
import randomizerDescription from '@/components/games/randomizer/README.md';
// @ts-ignore
import snakeDescription from '@/components/games/snake/README.md';
// @ts-ignore
import targetPractiseDescription from '@/components/games/target-practise/README.md';
// @ts-ignore
import ticTacToeDescription from '@/components/games/tic-tac-toe/README.md';
import { GameInfo } from '@/interfaces/GameInfo';
import { createStore } from 'vuex';


type GameKey = 'inTheShadows' | 'targetPractise' | 'calculator' | 'snake' | 'adventura' | 'ticTacToe' | 'randomizer' | 'cookieClicker'; // For proper typing

type AllGames = {
  [key in GameKey]: GameInfo;
};

// TODO add update histories to game descriptions. This could be collapsible. Look at commit history from GitHub (maybe). Make them objects, like: updates: [{ date: ??, message: ?? }, { date: ??, message: ?? }, ...]

const allGames: AllGames = {
  inTheShadows: {
    name: 'In the Shadows (DEMO)',
    route: '/in-the-shadows',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/in_the_shadows_thumbnail.jpg'),
    thumbnailImgAlt: 'In the Shadows game',
    releaseDate: '1.12.2020',
    description: {
      shortDescription: `Sneak past guards without going into light.`,
      longDescription: inTheShadowsDescription,
      /*        `**Note:** this game is a demo and may be expanded and improved later.
      
      Sneak past guards as you wander through each room.
      
      You are a thief whose task is to steal the incredibly valuable diamond. To stay hidden you must stay out of the guards' lights and utilize the different obstacles.`,*/
      madeWith: ['Godot (with GDScript)'],
      support: []
    }
  },
  targetPractise: {
    name: '🏹 Target Practise',
    route: '/target-practise',
    thumbnailImgSrc: require('@/assets/images/game-thumbnails/target_practise_thumbnail.jpg'),
    thumbnailImgAlt: 'Target Practise game',
    releaseDate: '31.8.2020',
    description: {
      shortDescription: `Shoot targets to get points and try to get as many points as you can.`,
      longDescription: targetPractiseDescription,
      madeWith: ['Unity', 'C#', 'Blender'],
      support: ['Fullscreen support: yes']
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
      longDescription: calculatorDescription,
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
      longDescription: snakeDescription,
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
      longDescription: adventuraDescription,
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
      longDescription: ticTacToeDescription,
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
      longDescription: randomizerDescription,
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
      longDescription: cookieClickerDescription,
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
