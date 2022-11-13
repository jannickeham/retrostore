<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { heart } from "ionicons/icons";
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
      <div class="flex-center mt-5">
        <ion-text>
          <h1 class="margin-vertical-103 retro-text">GAME OVER</h1>
          <h4 class="text-primary text-center">404 page not found</h4>
        </ion-text>
      </div>
      <div class="flex-center mt-5">
        <ion-button router-link="/welcome"
          >New Game <ion-icon :icon="heart" color="white" slot="end"></ion-icon
        ></ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style></style>
