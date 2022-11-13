<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonGrid,
  IonRow,
  IonButton,
  onIonViewDidEnter,
  IonChip,
  IonIcon,
  IonLabel,
  IonFooter,
} from "@ionic/vue";
import {
  chatboxEllipsesOutline,
  personOutline,
  locationOutline,
} from "ionicons/icons";

import TabBar from "@/components/TabBar.vue";
import ProductImage from "@/components/ProductImage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { IProduct, IProductResponse } from "@/models/ProductModels";

import { ref } from "vue";
import { useRoute } from "vue-router";
import { directus } from "@/services/directus.service";

const route = useRoute();

const { id } = route.params;

let isLoading = ref(false);

const product = ref<IProduct | null>(null);

onIonViewDidEnter(() => {
  fetchProduct();
});

const fetchProduct = async () => {
  isLoading.value = true;
  const response = await directus.graphql.items<IProductResponse>(`
    query {
      product_by_id(id: ${id}){
        id,
        title,
        description,
        location,
        price,
        category,
        image {
          id
        },
        user_created {
          first_name
          email
          
        }
      }
    }
   `);
  if (response.status === 200 && response.data) {
    isLoading.value = false;
    product.value = response.data.product_by_id;
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

    <ion-content v-if="product" :fullscreen="true">
      <loading-spinner v-if="isLoading"></loading-spinner>

      <product-image :image-id="product.image.id" />

      <ion-text>
        <h1 class="margin-vertical-103 text-white">{{ product.title }}</h1>
      </ion-text>

      <div class="flex-center mr-10">
        <ion-chip>
          <ion-icon
            :icon="personOutline"
            size="small"
            class="icon-primary"
          ></ion-icon>
          <ion-label class="white-txt">
            {{ product.user_created.first_name }}
          </ion-label>
        </ion-chip>

        <ion-chip>
          <ion-icon
            :icon="locationOutline"
            size="small"
            class="icon-primary"
          ></ion-icon>
          <ion-label class="white-txt">
            {{ product.location }}
          </ion-label>
        </ion-chip>
      </div>

      <div class="ml-03">
        <ion-grid>
          <ion-row>
            <div v-for="category in product.category" :key="category">
              <ion-chip
                shape="round"
                color="primary"
                size="small"
                fill="outline"
                >{{ category }}</ion-chip
              >
            </div>
          </ion-row>
        </ion-grid>
      </div>

      <ion-text>
        <p class="ml-07 retro-text">NOK&nbsp;{{ product.price }},-</p>
      </ion-text>

      <ion-text>
        <p class="margin-vertical-103 normal-text">
          {{ product.description }}
        </p>
      </ion-text>

      <a :href="`mailto:${product.user_created.email}`"
        ><ion-button expand="block" class="margin-vertical-1"
          >Kontakt selger
          <ion-icon
            class="icon-arrow ion-float-right"
            :icon="chatboxEllipsesOutline"
            size="small"
            slot="end"
            color="white"
          ></ion-icon></ion-button
      ></a>
    </ion-content>
    <ion-footer><TabBar></TabBar></ion-footer>
  </ion-page>
</template>

<style></style>
