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
  IonIcon,
  IonChip,
  IonFooter,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { locationOutline, arrowForwardCircleOutline } from "ionicons/icons";
import TabBar from "@/components/TabBar.vue";

const productCardInfo = ref([
  {
    id: 1,
    title: "N64 til salgs",
    description: "N64 selges billig",
    location: "Oslo",
    price: "1000",
    category: "nintendo",
    imageURL:
      "https://www.looper.com/img/gallery/this-is-the-best-selling-n64-game-of-all-time/l-intro-1649090213.jpg",
  },
  {
    id: 2,
    title: "N64 til salgs",
    description: "N64 selges billig",
    location: "Oslo",
    price: "1000",
    category: "nintendo",
    imageURL:
      "https://www.looper.com/img/gallery/this-is-the-best-selling-n64-game-of-all-time/l-intro-1649090213.jpg",
  },
]);
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-title class="retro-text">Retro<span>Store</span></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="product in productCardInfo" :key="product.id">
        <img :src="product.imageURL" />
        <ion-card-header>
          <ion-card-title>{{ product.title }}</ion-card-title>

          <ion-card-subtitle>
            <ion-icon :icon="locationOutline" size="small"></ion-icon>
            {{ product.location }}
          </ion-card-subtitle>
          <ion-chip color="primary">{{ product.category }}</ion-chip>
        </ion-card-header>
        <ion-card-content>
          <div>
            <p class="ion-float-left retro-text">{{ product.price }},-</p>
            <ion-button
              class="ion-float-right link"
              fill="clear"
              :router-link="'/detail/' + product.id"
              >Se annonse<ion-icon
                class="icon-arrow ion-float-right"
                :icon="arrowForwardCircleOutline"
                size="large"
                slot="end"
              ></ion-icon
            ></ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.card-content {
  margin-bottom: 2rem;
}

ion-icon {
  color: #e85112;
}

ion-card-subtitle {
  color: #ffffff;
}

ion-card-title {
  color: #ffffff;
  margin-bottom: 1rem !important;
}

.link {
  color: #ffffff;
  font-size: small !important;
}
</style>
