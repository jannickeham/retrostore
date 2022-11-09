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
  IonImg,
  RefresherCustomEvent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { directus } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { locationOutline, arrowForwardCircleOutline } from "ionicons/icons";
import ProductCard from "@/components/ProductCard.vue";
import TabBar from "@/components/TabBar.vue";

const productCardInfo = ref([]);
const userAccessToken = localStorage.getItem("auth_token");

console.log("token " + userAccessToken);

onIonViewDidEnter(() => {
  fetchProducts();
});

const refreshProductView = async (event: RefresherCustomEvent) => {
  await fetchProducts();
  event.target.complete();
};

const fetchProducts = async () => {
  const response = await directus.graphql.items(`
    query {
      product {
        id,
        title,
        description,
        category,
        price,
        location,
        image {
          id
        },
        user_created {
          first_name
        }
      }
    }
   `);

  console.log("her da?");

  if (response.status === 200 && response.data) {
    productCardInfo.value = [...response.data.product];
    console.log(productCardInfo.value);
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
      <ion-refresher slot="fixed" @ionRefresh="refreshProductView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <product-card
        v-for="product in productCardInfo"
        :key="product.id"
        :product="product"
      ></product-card>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
