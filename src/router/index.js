import Vue from "vue";
import VueRouter from "vue-router";
import TheLogin from "../views/TheLogin";
import TestA from "../views/TestA";
import TestA1 from "../views/TestA1";
import TestA2 from "../views/TestA2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/flex"
  },
  {
    path: "/login",
    name: "login",
    component: TheLogin
  },
  {
    path: "/dynamic",
    name: "dynamic",
    component: () => import("../views/DynamicApp.vue"),
    children: [{
      props: true,
      path: "root",
      name: "root",
      component: () => import("../views/DynamicRoot.vue")
    }]
  },
  {
    path: "/flex",
    name: "flexLayout",
    component: () => import("../views/FlexApp.vue")
  },
  {
    path: "/grid",
    name: "gridLayout",
    component: () =>
      import("../views/GridApp.vue")
  },
  {
    path: "/testA",
    name: "testA",
    component: TestA,
    children: [
      {
        path: "test",
        name: "test",
        components: { default: TestA1, sidebar: TestA2 }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  // console.log("前置路由守卫", to, from);
  if (sessionStorage.getItem("user") || to.name === "login") {
    next();
  } else {
    router.push("/login");
  }
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {

});

export default router;
