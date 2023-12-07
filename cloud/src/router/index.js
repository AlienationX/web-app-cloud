import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from './routes'
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return {
        left:0,
        top:0,
    }
  }
});

export default router;
