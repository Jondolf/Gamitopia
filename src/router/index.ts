import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
const Home = () => import('../views/Home.vue');

const isAdmin = localStorage.getItem('jwt');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // Main pages
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home | Gamitopia'
    }
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../views/Games.vue'),
    meta: {
      title: 'Games | Gamitopia'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: {
      title: 'News | Gamitopia'
    }
  },
  {
    path: '/news/:id',
    component: () => import('../views/news/IndividualNewsPostView.vue'),
    beforeEnter: (to, from, next) => {
      document.title = `News post #${to.params.id} | Gamitopia`;
      next();
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About | Gamitopia'
    }
  },

  // Admin
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: {
      title: 'Admin login | Gamitopia'
    }
  },
  {
    path: '/admin/create-news-post',
    name: 'create-news-post',
    component: () => import('../views/admin/NewsPostCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (isAdmin) {
        next();
      } else {
        next('admin/login');
      }
    },
    meta: {
      title: 'Create news post | Gamitopia'
    }
  },
  {
    path: '/admin/edit-news-post/:id',
    name: 'edit-news-post',
    component: () => import('../views/admin/NewsPostEdit.vue'),
    beforeEnter: (to, from, next) => {
      if (isAdmin) {
        document.title = `Edit news post #${to.params.id} | Gamitopia`;
        next();
      } else {
        next('admin/login');
      }
    }
  },

  // Games
  {
    path: '/cookie-clicker',
    name: 'cookie-clicker',
    component: () => import('../views/games/CookieClicker.vue'),
    meta: {
      title: 'Cookie Clicker | Gamitopia'
    }
  },
  {
    path: '/randomizer',
    name: 'randomizer',
    component: () => import('../views/games/Randomizer.vue'),
    meta: {
      title: 'Randomizer | Gamitopia'
    }
  },
  {
    path: '/tic-tac-toe',
    name: 'tic-tac-toe',
    component: () => import('../views/games/Tic-Tac-Toe.vue'),
    meta: {
      title: 'Tic-tac-toe | Gamitopia'
    }
  },
  {
    path: '/adventura',
    name: 'adventura',
    component: () => import('../views/games/Adventura.vue'),
    meta: {
      title: 'Adventura | Gamitopia'
    }
  },
  {
    path: '/snake',
    name: '/snake',
    component: () => import('../views/games/Snake.vue'),
    meta: {
      title: 'Snake | Gamitopia'
    }
  },
  {
    path: '/card',
    name: '/card',
    component: () => import('../views/games/CardGame.vue'),
    meta: {
      title: 'Card game | Gamitopia'
    }
  },
  {
    path: '/target-practise',
    name: 'targetpractise',
    component: () =>
      import('../views/games/target-practise/TargetPractise.vue'),
    meta: {
      title: 'Target Practise | Gamitopia'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
