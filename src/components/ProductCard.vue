<script setup lang="ts">
import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
} from "@ionic/vue";
import { locationOutline, arrowForwardCircleOutline } from "ionicons/icons";
import ProductImage from "@/components/ProductImage.vue";

interface Props {
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    location: string;
    category: string[];
    image: {
      id: string;
    };
  };
}

defineProps<Props>();
</script>

<template>
  <ion-card class="card">
    <product-image :image-id="product.image.id" />

    <ion-card-header>
      <ion-card-title class="mb-1 text-white">{{
        product.title
      }}</ion-card-title>

      <ion-card-subtitle class="link text-white">
        <ion-icon
          :icon="locationOutline"
          class="icon-primary"
          size="small"
        ></ion-icon>
        {{ product.location }}
      </ion-card-subtitle>

      <ion-chip v-for="c in product.category" :key="c" color="primary">
        {{ c }}
      </ion-chip>
    </ion-card-header>

    <ion-card-content>
      <div>
        <p class="ion-float-left retro-text">{{ product.price }},-</p>
        <ion-button
          class="ion-float-right link text-white"
          fill="clear"
          :router-link="'/detail/' + product.id"
          >Se annonse<ion-icon
            class="icon-arrow ion-float-right icon-primary"
            :icon="arrowForwardCircleOutline"
            size="large"
            slot="end"
          ></ion-icon
        ></ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<style></style>
