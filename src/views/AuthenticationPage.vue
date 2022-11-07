<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import TabBar from "@/components/TabBar.vue";
import { logInOutline, enterOutline } from "ionicons/icons";
import { ref } from "vue";

//retro mario image https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Mario-2-icon.png

let registerUser = ref(false);
const isNewUser = () => {
  if (registerUser.value == false) {
    registerUser.value = true;
  } else {
    registerUser.value = false;
  }
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="retro-text">Retro<span>Store</span></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <img
          class="mario-img"
          alt="Retro Mario Image"
          src="https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Mario-2-icon.png"
        />
      </div>

      <div class="login-container">
        <ion-item v-if="registerUser">
          <ion-label color="light" position="stacked" placeholder="Navn"
            >Navn</ion-label
          >
          <ion-input placeholder="Navn" color="light"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="light" position="stacked" placeholder="Epost"
            >Epost</ion-label
          >
          <ion-input placeholder="Epost" color="light"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="light" position="stacked" placeholder="Passord"
            >Passord</ion-label
          >
          <ion-input
            placeholder="Passord"
            type="password"
            color="light"
          ></ion-input>
        </ion-item>
      </div>
      <ion-button v-if="!registerUser" class="login-btn" expand="block"
        >Logg inn<ion-icon
          class="icon-white"
          :icon="logInOutline"
          size="large"
          slot="end"
        ></ion-icon
      ></ion-button>
      <ion-button
        @click="isNewUser"
        v-if="!registerUser"
        class="register-btn"
        expand="block"
        fill="clear"
        >Registrer ny bruker</ion-button
      >
      <ion-button
        class="margin-2"
        @click="isNewUser"
        v-if="registerUser"
        expand="block"
      >
        Registrer
        <ion-icon
          :icon="enterOutline"
          color="white"
          size="small"
          slot="end"
        ></ion-icon
      ></ion-button>
      <ion-button
        @click="isNewUser"
        v-if="registerUser"
        class="register-btn"
        expand="block"
        fill="clear"
      >
        Logg inn istedenfor</ion-button
      >
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.margin-2 {
  margin-top: 1rem;
}

.icon-primary {
  color: #e85112;
}

.login-btn {
  margin-top: 1.5rem;
}

.mario-img {
  width: 9rem;
  height: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  margin-right: 2rem;
}

span {
  color: #e85112;
}

.register-btn {
  text-decoration: underline;
  color: #ffffff;
}
</style>
