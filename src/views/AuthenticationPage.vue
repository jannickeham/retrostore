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
//retro mario image https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Mario-2-icon.png
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
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
    </ion-content>
  </ion-page>
</template>

<style>
.mario-img {
  width: 10rem;
  height: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  color: #e85112;
}
</style>
