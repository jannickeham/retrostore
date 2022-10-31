<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  onIonViewDidEnter,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

/*const tradingPost = ref([
  {
    id: 1,
    title: "N64 for sale",
    description: "N64 selling cheap.",
    hashtags: "#n64 #nintendo #mario",
    imageURL:
      "https://www.looper.com/img/gallery/this-is-the-best-selling-n64-game-of-all-time/l-intro-1649090213.jpg",
  },
]);*/
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-title>RetroStore</ion-title>
        <ion-button slot="end" shape="round" color="bgm" router-link="/new-spot"
          >+</ion-button
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card></ion-card>
      <ion-button color="primary">test</ion-button>
    </ion-content>
  </ion-page>
</template>
