import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import gameRoutes from './games';
import adminRoutes from './admin';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home | Gamitopia'
    }
  },
  {
    path: '/games/',
    name: 'games',
    component: () => import('../views/Games.vue'),
    meta: {
      title: 'Games | Gamitopia'
    }
  },
  {
    path: '/news/',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: {
      title: 'News | Gamitopia'
    }
  },
  {
    path: '/news/:id/',
    component: () => import('../views/news/IndividualNewsPostView.vue'),
    beforeEnter: (to, from, next) => {
      document.title = `News post #${to.params.id} | Gamitopia`;
      next();
    }
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About | Gamitopia'
    }
  },

  ...gameRoutes,
  ...adminRoutes
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
