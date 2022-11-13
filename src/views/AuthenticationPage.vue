<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { logInOutline, enterOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/directus.service";

import TabBar from "@/components/TabBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = useRouter();
let isLoading = ref(false);
let registerUser = ref(false);

//retro mario image https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Mario-2-icon.png
const image = "retromario";
let validationError = ref(false);
let registerError = ref(false);

const userDetails = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const handleValidationErrorMessage = () => {
  validationError.value = true;
};
const handleRegisterErrorMessage = () => {
  registerError.value = true;
};

const isNewUser = () => {
  if (registerUser.value == false) {
    registerUser.value = true;
  } else {
    registerUser.value = false;
  }
};

const login = async () => {
  try {
    isLoading.value = true;
    await authService.login(
      userDetails.value.email,
      userDetails.value.password
    );
    isLoading.value = false;

    //Go to profile and don't save router history for login
    router.replace("/profile");
  } catch (error) {
    console.log(error);
    console.log("her");
    isLoading.value = false;
    handleValidationErrorMessage();
  }
};

const register = async () => {
  try {
    isLoading.value = true;
    await authService.register(
      userDetails.value.firstName,
      userDetails.value.lastName,
      userDetails.value.email,
      userDetails.value.password
    );
    await login();
  } catch (error) {
    console.log(error);
    isLoading.value = false;
    handleRegisterErrorMessage();
  }
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-title router-link="/welcome" class="retro-text"
          >Retro<span>Store</span></ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <loading-spinner v-if="isLoading"></loading-spinner>
      <section v-if="!isLoading">
        <div class="flex-center">
          <img
            class="login-img"
            alt="Bilde av retro Mario"
            :src="require(`../assets/${image}.png`)"
          />
        </div>

        <div class="flex-center margin-0 retro-text" v-if="!registerUser">
          <h1>Logg inn</h1>
        </div>
        <div class="flex-center margin-0 retro-text" v-if="registerUser">
          <h1>Registrer deg</h1>
        </div>
        <form>
          <div class="mr-2">
            <ion-item v-if="registerUser">
              <ion-label color="light" position="stacked" placeholder="Fornavn"
                >Fornavn</ion-label
              >
              <ion-input
                v-model="userDetails.firstName"
                placeholder="Fornavn"
                color="light"
              ></ion-input>
            </ion-item>
            <ion-item v-if="registerUser">
              <ion-label
                color="light"
                position="stacked"
                placeholder="Etternavn"
                >Etternavn</ion-label
              >
              <ion-input
                v-model="userDetails.lastName"
                placeholder="Etternavn"
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
            <div v-if="validationError" class="flex-center">
              <p class="text-primary">*Obs! Brukernavn eller passord er feil</p>
            </div>
            <div v-if="registerError" class="flex-center">
              <p class="text-primary">*Obs! Du må fylle ut alle felt</p>
            </div>
          </div>
          <ion-button
            @click="login"
            v-if="!registerUser"
            class="mt-5 text-deco-none margin-vertical-1"
            expand="block"
            type="submit"
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
            class="secondary-btn margin-vertical-1"
            expand="block"
            fill="clear"
            >Registrer ny bruker</ion-button
          >
          <ion-button
            @click="register"
            class="mt-1 margin-vertical-1"
            v-if="registerUser"
            expand="block"
            type="submit"
          >
            Registrer
            <ion-icon
              :icon="enterOutline"
              color="white"
              size="large"
              slot="end"
            ></ion-icon
          ></ion-button>
          <ion-button
            @click="isNewUser"
            v-if="registerUser"
            class="secondary-btn margin-vertical-1"
            expand="block"
            fill="clear"
          >
            Logg inn istedenfor</ion-button
          >
        </form>
      </section>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
