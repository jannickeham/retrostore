<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import TabBar from "@/components/TabBar.vue";
import { authService } from "@/services/directus.service";
import { useRouter } from "vue-router";

const userAccessToken = localStorage.getItem("auth_token");

const router = useRouter();

let isLoggedIn = true;

const logout = async () => {
  try {
    await authService.logout();
    //Go to home and don't save router history for login
    router.replace("/home");
    isLoggedIn = false;
    console.log("200 ok");
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Min profil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-avatar class="profile-avatar">
          <img
            alt="Profil picture"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </ion-avatar>
        <h1 class="profile-name retro-text">Navn Navnesen</h1>
        <p>navn.navnesen@gmail.com</p>
      </div>
      <div class="container">
        <div>Mine annonser</div>
        <div>Mine favoritter</div>
      </div>
      <ion-button @click="logout" expand="block"
        >Logg ut
        <ion-icon
          class="icon-white"
          :icon="logOutOutline"
          size="large"
          slot="end"
        ></ion-icon
      ></ion-button>
    </ion-content>
    <ion-footer>
      <TabBar userAccessToken></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.profile-avatar {
  width: 10rem !important;
  height: auto !important;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.icon-white {
  color: #ffffff !important;
}
</style>
