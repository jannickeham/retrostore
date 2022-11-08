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
import { directus } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { locationOutline, arrowForwardCircleOutline } from "ionicons/icons";
import TabBar from "@/components/TabBar.vue";

const productCardInfo = ref([]);
const userAccessToken = localStorage.getItem("auth_token");

console.log("token " + userAccessToken);

onIonViewDidEnter(async () => {
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
  if (response.status === 200 && response.data) {
    productCardInfo.value = [...response.data.product];
    console.log(productCardInfo.value);
  }
});
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
      <ion-card v-for="product in productCardInfo" :key="product.id">
        <img
          :src="`https://v6a8qmt5.directus.app/assets/${product.image.id}?access_token=${userAccessToken}`"
        />
        <ion-card-header>
          <ion-card-title>{{ product.title }}</ion-card-title>

          <ion-card-subtitle>
            <ion-icon :icon="locationOutline" size="small"></ion-icon>
            {{ product.location }}
          </ion-card-subtitle>
          <ion-chip v-for="c in product.category" :key="c" color="primary">{{
            c
          }}</ion-chip>
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
      <TabBar userAccessToken></TabBar>
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
