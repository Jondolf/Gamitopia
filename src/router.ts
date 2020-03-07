import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

let isAdmin = localStorage.getItem('jwt');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // Main pages
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('./views/Games.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/News.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },

    // Admin
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('./views/admin/AdminLogin.vue')
    },
    {
      path: '/admin/create-news-post',
      name: 'create-news-post',
      component: () => import('./views/admin/NewsPostCreate.vue'),
      beforeEnter: (to, from, next) => {
        if (isAdmin) {
          next();
        } else {
          next('admin/login');
        }
      }
    },
    {
      path: '/admin/edit-news-post/:id',
      name: 'edit-news-post',
      component: () => import('./views/admin/NewsPostEdit.vue'),
      beforeEnter: (to, from, next) => {
        if (isAdmin) {
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
      component: () => import('./views/games/CookieClicker.vue')
    },
    {
      path: '/randomizer',
      name: 'randomizer',
      component: () => import('./views/games/Randomizer.vue')
    },
    {
      path: '/tic-tac-toe',
      name: 'tic-tac-toe',
      component: () => import('./views/games/Tic-Tac-Toe.vue')
    },
    {
      path: '/adventura',
      name: 'adventura',
      component: () => import('./views/games/Adventura.vue')
    },
    {
      path: '/snake',
      name: '/snake',
      component: () => import('./views/games/Snake.vue')
    },
    {
      path: '/card',
      name: '/card',
      component: () => import('./views/games/CardGame.vue')
    }
  ]
});
