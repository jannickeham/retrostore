<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonImg,
  IonText,
  IonGrid,
  IonRow,
  IonButton,
  onIonViewDidEnter,
  IonSpinner,
  IonChip,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonFooter,
} from "@ionic/vue";
import { chatboxEllipsesOutline } from "ionicons/icons";

import TabBar from "@/components/TabBar.vue";

import { ref } from "vue";
import { useRoute } from "vue-router";
import { directus } from "@/services/directus.service";

const route = useRoute();
const { id } = route.params;
const product = ref(null);
//const user = ref(null);
//const isLoadingCampSpot = ref(true);
const userAccessToken = localStorage.getItem("auth_token");

onIonViewDidEnter(() => {
  fetchProduct();
});

const fetchProduct = async () => {
  const response = await directus.graphql.items(`
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
        }
      }
    }
   `);
  if (response.status === 200 && response.data) {
    product.value = response.data.product_by_id;
  }
};

const map =
  "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg";

const avatarImg = "https://www.w3schools.com/howto/img_avatar.png";
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title router-link="/welcome" class="retro-text"
          >Retro<span>Store</span></ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="product" :fullscreen="true">
      <ion-img
        :src="`https://v6a8qmt5.directus.app/assets/${product.image.id}`"
        class="ion-margin"
      />
      <ion-text>
        <h1 class="ion-margin-start">{{ product.title }}</h1>
      </ion-text>
      <ion-chip class="ion-margin-start">
        <ion-avatar>
          <img :src="avatarImg" />
        </ion-avatar>
        <ion-label class="white-txt">{{
          product.user_created.first_name
        }}</ion-label>
      </ion-chip>

      <ion-text>
        <p class="ion-margin-start">{{ product.description }}</p>
      </ion-text>
      <ion-text>
        <h2 class="ion-margin-start retro-text">{{ product.price }},-</h2>
      </ion-text>

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

      <ion-text>
        <h3 class="ion-margin-start">Lokasjon</h3>
      </ion-text>
      <ion-img :src="map" class="ion-margin" />

      <ion-button expand="block"
        >Kontakt selger
        <ion-icon
          class="icon-arrow ion-float-right"
          :icon="chatboxEllipsesOutline"
          size="small"
          slot="end"
          color="white"
        ></ion-icon
      ></ion-button>
    </ion-content>
    <ion-footer><TabBar></TabBar></ion-footer>
  </ion-page>
</template>

<style>
h1 {
  color: #e85112 !important;
}

ion-img::part(image) {
  border-radius: 10px;
}

div {
  color: #ffffff;
}

.white-txt {
  color: #ffffff !important;
}
</style>
