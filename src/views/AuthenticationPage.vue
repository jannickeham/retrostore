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
import { authService } from "@/services/directus.service";
import TabBar from "@/components/TabBar.vue";
import { logInOutline, enterOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { directus } from "@/services/directus.service";
const router = useRouter();
let isLoggedIn = false;

//retro mario image https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Mario-2-icon.png

const userDetails = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

let registerUser = ref(false);
const isNewUser = () => {
  if (registerUser.value == false) {
    registerUser.value = true;
  } else {
    registerUser.value = false;
  }
};

const login = async () => {
  try {
    await authService.login(
      userDetails.value.email,
      userDetails.value.password
    );
    //Go to home and don't save router history for login
    router.replace("/profile");
    isLoggedIn = true;
    console.log("200 ok");
  } catch (error) {
    console.log(error);
  }
};

const register = async () => {
  try {
    console.log("registration 200 ok");
    const wasRegistered = await authService.register(
      userDetails.value.firstName,
      userDetails.value.lastName,
      userDetails.value.email,
      userDetails.value.password
    );
    await login();
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
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title router-link="/welcome" class="retro-text"
          >Retro<span>Store</span></ion-title
        >
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

      <div class="title-container retro-text" v-if="!registerUser">
        <h1>Logg inn</h1>
      </div>
      <div class="title-container retro-text" v-if="registerUser">
        <h1>Registrer deg</h1>
      </div>
      <div class="login-container">
        <ion-item v-if="registerUser">
          <ion-label color="light" position="stacked" placeholder="Navn"
            >Fornavn</ion-label
          >
          <ion-input
            v-model="userDetails.firstName"
            placeholder="Navn"
            color="light"
          ></ion-input>
        </ion-item>
        <ion-item v-if="registerUser">
          <ion-label color="light" position="stacked" placeholder="Etternavn"
            >Etternavn</ion-label
          >
          <ion-input
            v-model="userDetails.lastName"
            placeholder="Navn"
            color="light"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="light" position="stacked" placeholder="Epost"
            >Epost</ion-label
          >
          <ion-input
            v-model="userDetails.email"
            placeholder="Epost"
            color="light"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label color="light" position="stacked" placeholder="Passord"
            >Passord</ion-label
          >
          <ion-input
            v-model="userDetails.password"
            placeholder="Passord"
            type="password"
            color="light"
          ></ion-input>
        </ion-item>
      </div>
      <ion-button
        @click="login"
        v-if="!registerUser"
        class="login-btn"
        expand="block"
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
        @click="register"
        class="margin-2"
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
.title-container {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.margin-2 {
  margin-top: 1rem;
}

.icon-primary {
  color: #e85112;
}

.login-btn {
  margin-top: 5rem;
  text-decoration: none !important;
}

.mario-img {
  width: 7rem;
  height: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0 !important;
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
