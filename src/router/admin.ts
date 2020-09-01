import { getNewsPost } from '@/views/admin/actions/getNewsPost';
import { RouteRecordRaw } from "vue-router";

const isAdmin = localStorage.getItem('jwt');

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: {
      title: 'Admin login | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: 'Here you can log in as an admin.'
        }
      ]
    }
  },
  {
    path: '/admin/create-news-post',
    name: 'CreateNewsPost',
    component: () => import('../views/admin/NewsPostCreate.vue'),
    beforeEnter: (to, from, next) => {
      if (isAdmin) {
        next();
      } else {
        next('admin/login');
      }
    },
    meta: {
      title: 'Create news post | Gamitopia',
      metaTags: [
        {
          name: 'description',
          content: 'Here you can create news posts.'
        }
      ]
    }
  },
  {
    path: '/admin/edit-news-post/:id',
    name: 'EditNewsPost',
    component: () => import('../views/admin/NewsPostEdit.vue'),
    beforeEnter: async (to, from, next) => {
      if (isAdmin) {
        const newsPost = await getNewsPost(to.params.id.toString());
        document.title = `Edit "${newsPost.title}" | Gamitopia`;
        document.querySelector('head meta[name=description]')?.setAttribute('content', `Here you can edit the news post "${newsPost.title}" #${newsPost.id}`)
        next();
      } else {
        next('admin/login');
      }
    }
  }
];

export default adminRoutes;