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
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonButton,
  onIonViewDidEnter,
  IonSpinner,
  IonChip,
  IonIcon,
  IonAvatar,
  IonLabel,
} from "@ionic/vue";
import { chatboxEllipsesOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRoute } from "vue-router";
//import { directus } from "@/services/directus.service";

const route = useRoute();
//const { id } = route.params;
//const spotData = ref(null);
//const isLoadingCampSpot = ref(true);
//const userAccessToken = localStorage.getItem("auth_token");

/*onIonViewDidEnter(() => {
  fetchCampingSpot();
});*/

/*const fetchCampingSpot = async () => {
  const response = await directus.graphql.items(`
    query {
      camp_spots_by_id(id: ${id}){
        id,
        title,
        description,
        hashtags,
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
    spotData.value = response.data.camp_spots_by_id;
    isLoadingCampSpot.value = false;
  }
};*/

const product = {
  id: 1,
  title: "N64 til salgs",
  description: "N64 selges billig",
  location: "Oslo",
  price: "1000",
  category: ["nintendo", "n64", "mario"],
  imageURL:
    "https://www.looper.com/img/gallery/this-is-the-best-selling-n64-game-of-all-time/l-intro-1649090213.jpg",
};

const map =
  "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg";
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="retro-text">Retro<span>Store</span></ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-img :src="product.imageURL" class="ion-margin" />
      <ion-text>
        <h1 class="ion-margin-start">{{ product.title }}</h1>
      </ion-text>
      <ion-chip class="ion-margin-start">
        <ion-avatar>
          <img
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
        </ion-avatar>
        <ion-label class="white-txt">Kris Adamsen</ion-label>
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
