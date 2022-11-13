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
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { IProduct, IProductsResponse } from "@/models/ProductModels";

//Info which goes on the product card
const productCardInfo = ref<IProduct[]>([]);

//Variable for holding results of products from searchbar
let results = ref(productCardInfo);

//Handles if page is loading from db or not
let isLoading = ref(false);

//When View is rendered, fetch all products from db
onIonViewDidEnter(() => {
  fetchProducts();
});

//Fetch products from db when scroll down on window
const refreshProductView = async (event: RefresherCustomEvent) => {
  await fetchProducts();
  event.target.complete();
};

//Fetch all products from directus
const fetchProducts = async () => {
  isLoading.value = true;
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

  //If fetching was success and contains data, put results in productCardInfo and set loading to false
  if (response.status === 200 && response.data) {
    isLoading.value = false;
    productCardInfo.value = [...response.data.product];
  }
};

//Search for products based on title in searchbar
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
        class="white"
        animated
        placeholder="Søk"
        :debounce="500"
        @ionChange="searchForProducts($event)"
      ></ion-searchbar>

      <ion-refresher slot="fixed" @ionRefresh="refreshProductView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <loading-spinner v-if="isLoading"></loading-spinner>

      <div v-if="!isLoading">
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
      </div>
    </ion-content>

    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
