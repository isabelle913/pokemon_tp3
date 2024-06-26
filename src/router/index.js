import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/list/results",
      name: "list",
      component: () => import("../views/ListView.vue"),
    },
    {
      path: "/pokemon/:id",
      name: "pokemon",
      component: () => import("../views/DetailsView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
    {
      path: "/:patchMatch(.*)*",
      component: HomeView,
    },
  ],
});

export default router;
