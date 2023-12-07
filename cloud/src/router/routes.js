// TODO 接口请求返回的数据

const routes = [
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
    name: "login",
  },
  {
    path: "/",
    //   component: HomeView,
    component: () => import("../views/HomeView.vue"),
    name: "home",
  },
  {
    path: "/404",
    component: () => import("../views/404View.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },

  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView.vue"),
  },
  {
    path: "/security",
    name: "security",
    component: () => import("../views/SecurityView.vue"),
  },
  {
    path: "/document",
    name: "document",
    component: () => import("../views/DocumentView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
];

export default routes;
