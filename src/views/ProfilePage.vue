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
  onIonViewDidEnter,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import TabBar from "@/components/TabBar.vue";
import { authService } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { directus } from "@/services/directus.service";
import { ref } from "vue";

const userAccessToken = localStorage.getItem("auth_token");

const router = useRouter();

let userInfo = ref([]);

onIonViewDidEnter(async () => {
  await currentUser();
});

const currentUser = async () => {
  try {
    const response = await authService.currentUser();
    userInfo.value = response;
    console.log("200 ok");
    console.log(userInfo.value);
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    await authService.logout();
    //Go to home and don't save router history for login
    router.replace("/home");
    //isLoggedIn = false;
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
            v-if="!userInfo.avatar"
            alt="Profil bilde"
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
          <img
            v-if="userInfo.avatar"
            alt="Profil bilde"
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

      <ion-button class="logout-btn" @click="logout" expand="block"
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
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.profile-avatar {
  width: 10rem !important;
  height: 10rem !important;
  margin-bottom: 2rem;
}

.profile-name {
  color: #e85112 !important;
  margin: 0 !important;
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

.logout-btn {
  margin-top: 5rem;
}
</style>
