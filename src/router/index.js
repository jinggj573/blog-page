import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: ()=> import("../views/Login.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/index",
    name: "Home",
    component: ()=> import("../views/Home.vue"),
    meta:{
      requireAuth: true
    }
  }
];

const router = new VueRouter({
  routes,
  mode:"history"
});

export default router;
