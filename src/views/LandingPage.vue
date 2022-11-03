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
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-title>RetroStore</ion-title>
        <ion-button
          slot="end"
          shape="round"
          color="bgm"
          router-link="/new-product"
          >+</ion-button
        >
      </ion-toolbar>
    </ion-header>

    <TabBar></TabBar>
  </ion-page>
</template>

<style></style>
