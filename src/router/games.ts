import { RouteRecordRaw } from 'vue-router';

const gameRoutes: Array<RouteRecordRaw> = [
  {
    path: '/cookie-clicker/',
    name: 'cookie-clicker',
    component: () => import('@/views/games/CookieClicker.vue'),
    meta: {
      title: 'Cookie Clicker | Gamitopia'
    }
  },
  {
    path: '/randomizer/',
    name: 'randomizer',
    component: () => import('@/views/games/Randomizer.vue'),
    meta: {
      title: 'Randomizer | Gamitopia'
    }
  },
  {
    path: '/tic-tac-toe/',
    name: 'tic-tac-toe',
    component: () => import('@/views/games/TicTacToe.vue'),
    meta: {
      title: 'Tic-tac-toe | Gamitopia'
    }
  },
  {
    path: '/adventura/',
    name: 'adventura',
    component: () => import('@/views/games/Adventura.vue'),
    meta: {
      title: 'Adventura | Gamitopia'
    }
  },
  {
    path: '/snake/',
    name: '/snake',
    component: () => import('@/views/games/Snake.vue'),
    meta: {
      title: 'Snake | Gamitopia'
    }
  },
  {
    path: '/calculator/',
    name: 'calculator',
    component: () => import('@/views/games/Calculator.vue'),
    meta: {
      title: 'Calculator | Gamitopia'
    }
  },
  {
    path: '/card/',
    name: 'card',
    component: () => import('@/views/games/CardGame.vue'),
    meta: {
      title: 'Card game | Gamitopia'
    }
  },
  {
    path: '/target-practise/',
    name: 'targetpractise',
    component: () =>
      import('@/views/games/target-practise/TargetPractise.vue'),
    meta: {
      title: 'Target Practise | Gamitopia'
    }
  }
]

export default gameRoutes;