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

const userAccessToken = localStorage.getItem("auth_token");

const image = "landingimage";
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="img-div">
        <img
          class="bg-img"
          :src="require(`../assets/${image}.png`)"
          alt="Bakgrunnsbilde fra Pacman-spill"
        />
      </div>
      <div class="center-pos">
        <h1 class="title">Retro<span>Store</span></h1>
        <h4 class="text-center">
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
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style></style>
