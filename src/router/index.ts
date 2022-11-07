import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import DetailPage from "../views/DetailPage.vue";
import AuthenticationPage from "../views/AuthenticationPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import PageNotFoundPage from "../views/PageNotFoundPage.vue";
import NewProductPage from "../views/NewProductPage.vue";
import LandingPage from "../views/LandingPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/new-product",
    name: "NewProduct",
    component: NewProductPage,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: DetailPage,
  },
  {
    path: "/login",
    name: "Login",
    component: AuthenticationPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
