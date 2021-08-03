import Vue from "vue";
import VueRouter from "vue-router";
import FlexApp from "../views/FlexApp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "flex",
    component: FlexApp
  },
  {
    path: "/flex",
    name: "flexLayout",
    component: () =>
      import("../views/FlexApp.vue")
  },
  {
    path: "/grid",
    name: "gridLayout",
    component: () =>
      import("../views/GridApp.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
