<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";

import TabBar from "@/components/TabBar.vue";
import { gameControllerOutline } from "ionicons/icons";

const landingPageImg =
  "https://sites.google.com/site/pacmangamearcade/_/rsrc/1472842306797/gameplay/overview/Pac-man.png?height=400&width=311";
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="img-div">
        <img class="bg-img" :src="landingPageImg" alt="" />
      </div>
      <div class="center-container">
        <h1 class="title">Retro<span>Store</span></h1>
        <h4 class="text-landing">
          Velkommen til Norges største marked for retrospill og konsoller
        </h4>
      </div>
      <div class="button-container">
        <div class="center-btn">
          <ion-button router-link="/home"
            >Se marked
            <ion-icon
              :icon="gameControllerOutline"
              color="white"
              size="small"
              slot="end"
            ></ion-icon
          ></ion-button>
          <ion-button class="login-btn" fill="clear">Logg inn</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>
.login-btn {
  text-decoration: underline;
  color: #ffffff;
}

.text-landing {
  text-align: center;
}

.img-div {
  width: 100%;
  height: 100%;
}

.bg-img {
  filter: blur(0.2rem) grayscale(0.6);
  object-fit: fill;
  width: 100%;
  height: 100%;
  opacity: 0.2;
}

span {
  color: #e85112;
}

.title {
  font-size: 2.5rem;
  font-family: "RetroGaming";
  z-index: 10;
  color: #ffffff !important;
}

.center-container {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center-btn {
  display: flex;
  flex-direction: column;
}

.button-container {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.margin-top-5 {
  margin-top: 5rem;
}
</style>
