<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonButton,
  IonIcon,
  IonFooter,
  onIonViewDidEnter,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";

import { authService } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { directus } from "@/services/directus.service";
import { ref } from "vue";

import TabBar from "@/components/TabBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const userAccessToken = localStorage.getItem("auth_token");

//Handles state of loading of user
let isLoading = ref(false);

const router = useRouter();

//Array containing userinfo
let userInfo = ref([]);

//When view renders, load and get the current user
onIonViewDidEnter(async () => {
  isLoading.value = true;
  await currentUser();
});

//Get the current logged in user
const currentUser = async () => {
  try {
    const response = await authService.currentUser();
    userInfo.value = response;
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

//Logs out current user
const logout = async () => {
  try {
    isLoading.value = true;
    await authService.logout();
    //Go to home and don't save router history for login
    router.replace("/welcome");
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-title>Min profil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <loading-spinner v-if="isLoading"></loading-spinner>

      <div v-if="!isLoading">
        <div class="container flex-center">
          <ion-avatar class="profile-avatar">
            <img
              v-if="!userInfo.avatar && !isLoading"
              alt="Standardbilde for profilhaver"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
            <img
              v-if="userInfo.avatar"
              alt="Profilbilde"
              :src="`https://v6a8qmt5.directus.app/assets/${userInfo.avatar}?access_token=${userAccessToken}`"
            />
          </ion-avatar>
          <h2 class="profile-name retro-text">
            {{ userInfo.first_name }}
          </h2>
          <h2 class="profile-name retro-text">
            {{ userInfo.last_name }}
          </h2>

          <p>{{ userInfo.email }}</p>
        </div>

        <ion-button
          class="mt-5 margin-vertical-1"
          @click="logout"
          expand="block"
          >Logg ut
          <ion-icon
            color="white"
            :icon="logOutOutline"
            size="large"
            slot="end"
          ></ion-icon
        ></ion-button>
      </div>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
