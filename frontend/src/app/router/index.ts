import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/app/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/app/pages/Index.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/app/pages/About.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/app/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
