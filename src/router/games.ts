import { RouteRecordRaw } from 'vue-router';

const gameRoutes: Array<RouteRecordRaw> = [
  {
    path: '/cookie-clicker',
    name: 'CookieClicker',
    component: () => import('@/views/games/CookieClicker.vue'),
    meta: {
      title: 'Cookie Clicker | Gamitopia'
    }
  },
  {
    path: '/randomizer',
    name: 'Randomizer',
    component: () => import('@/views/games/Randomizer.vue'),
    meta: {
      title: 'Randomizer | Gamitopia'
    }
  },
  {
    path: '/tic-tac-toe',
    name: 'TicTacToe',
    component: () => import('@/views/games/TicTacToe.vue'),
    meta: {
      title: 'Tic-Tac-Toe | Gamitopia'
    }
  },
  {
    path: '/adventura',
    name: 'Adventura',
    component: () => import('@/views/games/Adventura.vue'),
    meta: {
      title: 'Adventura | Gamitopia'
    }
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import('@/views/games/Snake.vue'),
    meta: {
      title: 'Snake | Gamitopia'
    }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('@/views/games/Calculator.vue'),
    meta: {
      title: 'Calculator | Gamitopia'
    }
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('@/views/games/CardGame.vue'),
    meta: {
      title: 'Card game | Gamitopia'
    }
  },
  {
    path: '/target-practise',
    name: 'TargetPractise',
    component: () => import('@/views/games/TargetPractise.vue'),
    meta: {
      title: 'Target Practise | Gamitopia'
    }
  }
]

export default gameRoutes;