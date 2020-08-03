import { RouteConfig } from "vue-router";

const isAdmin = localStorage.getItem('jwt');

const adminRoutes: Array<RouteConfig> = [
  {
    path: '/admin/login/',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: {
      title: 'Admin login | Gamitopia'
    }
  },
  {
    path: '/admin/create-news-post/',
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
    path: '/admin/edit-news-post/:id/',
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
  }
];

export default adminRoutes;