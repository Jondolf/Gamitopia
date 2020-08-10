import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import adminRoutes from './admin';
import gameRoutes from './games';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home | Gamitopia'
    }
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/Games.vue'),
    meta: {
      title: 'Games | Gamitopia'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
    meta: {
      title: 'News | Gamitopia'
    }
  },
  {
    path: '/news/:id',
    name: 'NewsPost',
    component: () => import('../views/news/IndividualNewsPostView.vue'),
    beforeEnter: (to, from, next) => {
      document.title = `News post #${to.params.id} | Gamitopia`;
      next();
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About | Gamitopia'
    }
  },

  ...gameRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
