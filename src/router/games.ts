import store from '@/store';
import { RouteRecordRaw } from 'vue-router';


const games = (store as any).state.games.allGames;
const gameRoutes: Array<RouteRecordRaw> = [
  {
    path: '/cookie-clicker',
    name: 'CookieClicker',
    component: () => import('@/views/games/CookieClicker.vue'),
    meta: {
      title: 'Cookie Clicker | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: games.cookieClicker.description.shortDescription
        }
      ]
    }
  },
  {
    path: '/randomizer',
    name: 'Randomizer',
    component: () => import('@/views/games/Randomizer.vue'),
    meta: {
      title: 'Randomizer | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.randomizer.description.shortDescription
      }]
    }
  },
  {
    path: '/tic-tac-toe',
    name: 'TicTacToe',
    component: () => import('@/views/games/TicTacToe.vue'),
    meta: {
      title: 'Tic-Tac-Toe | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.ticTacToe.description.shortDescription
      }]
    }
  },
  {
    path: '/adventura',
    name: 'Adventura',
    component: () => import('@/views/games/Adventura.vue'),
    meta: {
      title: 'Adventura | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.adventura.description.shortDescription
      }]
    }
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import('@/views/games/Snake.vue'),
    meta: {
      title: 'Snake | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.snake.description.shortDescription
      }]
    }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('@/views/games/Calculator.vue'),
    meta: {
      title: 'Calculator | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.calculator.description.shortDescription
      }]
    }
  },
  /*{
    path: '/card',
    name: 'Card',
    component: () => import('@/views/games/CardGame.vue'),
    meta: {
      title: 'Card game | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.cardGame.description.shortDescription
      }]
    }
  },*/
  {
    path: '/target-practise',
    name: 'TargetPractise',
    component: () => import('@/views/games/TargetPractise.vue'),
    meta: {
      title: 'Target Practise | Gamitopia',
      metaTags: [{
        name: 'description',
        content: games.targetPractise.description.shortDescription
      }]
    }
  }
]

export default gameRoutes;