<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewDidEnter,
  IonFooter,
  RefresherCustomEvent,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonList,
} from "@ionic/vue";
import { directus } from "@/services/directus.service";
import { ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import TabBar from "@/components/TabBar.vue";
import { IProduct, IProductsResponse } from "@/models/ProductModels";

const productCardInfo = ref<IProduct[]>([]);
let results = ref(productCardInfo);

onIonViewDidEnter(() => {
  fetchProducts();
});

//fetch products from db when scroll down on window
const refreshProductView = async (event: RefresherCustomEvent) => {
  await fetchProducts();
  event.target.complete();
};

//fetch products from directus
const fetchProducts = async () => {
  const response = await directus.graphql.items<IProductsResponse>(`
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
    }
    }
  }
`);

  if (response.status === 200 && response.data) {
    productCardInfo.value = [...response.data.product];
    console.log(productCardInfo.value);
  }
};

//Search for products based on title
const searchForProducts = (event) => {
  const query = event.target.value.toLowerCase();
  if (!query) {
    fetchProducts();
  }
  results.value = productCardInfo.value.filter(
    (p) => p.title.toLowerCase().indexOf(query) > -1
  );
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
      <ion-searchbar
        animated
        :debounce="1000"
        @ionChange="searchForProducts($event)"
      ></ion-searchbar>

      <ion-refresher slot="fixed" @ionRefresh="refreshProductView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list v-if="results.length"
        ><product-card
          v-for="result in results"
          :key="result.id"
          :product="result"
        ></product-card
      ></ion-list>

      <ion-list v-if="!results.length"
        ><product-card
          v-for="product in productCardInfo"
          :key="product.id"
          :product="product"
        ></product-card
      ></ion-list>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
