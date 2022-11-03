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

      <div class="login-container">
        <ion-item>
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
      <ion-button class="login-btn" expand="block">Logg inn</ion-button>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.login-btn {
  margin-top: 2rem;
}

.mario-img {
  width: 10rem;
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
</style>
