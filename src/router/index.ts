import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import DetailPage from "../views/DetailPage.vue";
import AuthenticationPage from "../views/AuthenticationPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import PageNotFoundPage from "../views/PageNotFoundPage.vue";
import NewProductPage from "../views/NewProductPage.vue";
import LandingPage from "../views/LandingPage.vue";
import { toastController } from "@ionic/vue";
import { authService } from "@/services/directus.service";

const authenticationRequiredRouteGuard = async () => {
  const userAccessToken = localStorage.getItem("auth_token");

  if (!userAccessToken) {
    const errorToast = await toastController.create({
      message: "Obs! Du må logge inn først.",
      duration: 3000,
      color: "primary",
    });
    await errorToast.present();
    return { name: "Login" };
  }

  const userAccessTokenExpiresAt = localStorage.getItem(
    "auth_expires_at"
  ) as unknown as number;

  if (userAccessTokenExpiresAt < new Date().getTime()) {
    const errorToast = await toastController.create({
      message: "Brukersesjon er utløpt. Logg inn på nytt.",
      duration: 3000,
      color: "primary",
    });

    await errorToast.present();

    authService.logout();
    return { name: "Login" };
  }
};

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
    beforeEnter: [authenticationRequiredRouteGuard],
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
    beforeEnter: [authenticationRequiredRouteGuard],
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
