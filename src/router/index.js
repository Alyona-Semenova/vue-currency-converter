import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
    meta: { layout: "AppLayoutHeader" },
  },
  {
    path: "/converter",
    name: "CurrencyConverter",
    component: () => import("../views/CurrencyConverter"),
    meta: { layout: "AppLayoutHeader" },
  },
  {
    path: "*",
    name: "404",
    component: () => import("../components/404"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
