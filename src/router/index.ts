import { getNewsPost } from '@/views/admin/actions/getNewsPost';
// @ts-ignore
import { trackRouter } from "vue-gtag-next";
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
      title: 'Home | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: 'The homepage for Gamitopia, a website with many different games that can range from classics like Snake and Tic-Tac-Toe, to unique small indie games like turn based strategy games, platformers and combat games. My goal is to make fun games and to learn programming along the way.Cookie Clicker is a game where you click a cookie to bake virtual cookies.'
        }
      ]
    }
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/Games.vue'),
    meta: {
      title: 'Games | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: `Here you can find Gamitopia's games and apps, such as classics like Snake and Tic-Tac-Toe, or small unique games like Adventura and Target Practise.`
        }
      ]
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
    meta: {
      title: 'News | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: 'Here you can find news posts regarding new games and updates, as well as posts about the development process.'
        }
      ]
    }
  },
  {
    path: '/news/:id',
    name: 'NewsPost',
    component: () => import('../views/news/IndividualNewsPostView.vue'),
    beforeEnter: async (to, from, next) => {
      const newsPost = await getNewsPost(to.params.id.toString());
      document.title = `${newsPost.title} | Gamitopia`;
      document.querySelector('head meta[name=description]')?.setAttribute('content', newsPost.bodyAsHTML.replace(/(<([^>]+)>)/gi, "").replace(/\r?\n|\r/g, ' ').slice(0, 50) + '...');
      next();
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: 'Here you can find out some information about Gamitopia and about me.'
        }
      ]
    }
  },

  ...gameRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

trackRouter(router);

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMetaDescription = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
  } else {
    document.title = 'Gamitopia';
  }

  if (!nearestWithMetaDescription) {
    return next();
  };

  (nearestWithMetaDescription.meta.metaTags as any[]).map((metaTag: { name: string, content: string; }) => {
    const descriptionElement = document.querySelector('head meta[name="description"]') as HTMLMetaElement;
    descriptionElement.setAttribute('content', metaTag.content);
  });

  next();
});

export default router;
