import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/games",
      name: "games",
      component: () => import("./views/Games.vue")
    },
    {
      path: "/news",
      name: "news",
      component: () => import("./views/News.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/cookie-clicker",
      name: "cookie-clicker",
      component: () => import("./views/games/CookieClicker.vue")
    },
    {
      path: "/randomizer",
      name: "randomizer",
      component: () => import("./views/games/Randomizer.vue")
    }
  ]
});
