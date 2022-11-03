<script setup lang="ts">
import {
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import {
  homeOutline,
  addCircleOutline,
  searchOutline,
  chatboxEllipsesOutline,
  personOutline,
} from "ionicons/icons";
import { useRoute } from "vue-router";
import { computed } from "vue";

// How to get current routing
//https://stackoverflow.com/questions/65989489/best-way-to-get-current-route-in-vue3-and-vue-router

const route = useRoute();

const path = computed(() => route.path);
const currentRoute = path.value;
console.log(currentRoute);
</script>

<template>
  <ion-grid :fixed="true">
    <ion-row class="tabbar ion-align-items-center ion-justify-items-center">
      <ion-col>
        <ion-button router-link="/home" fill="clear" size="small"
          ><ion-icon
            :icon="homeOutline"
            size="large"
            class="tabbar-item"
          ></ion-icon
        ></ion-button>
        Hjem
      </ion-col>
      <ion-col>
        <ion-button router-link="/search" fill="clear" size="small"
          ><ion-icon
            :icon="searchOutline"
            size="large"
            class="tabbar-item"
          ></ion-icon
        ></ion-button>
        Søk
      </ion-col>
      <ion-col>
        <ion-button router-link="/new-product" fill="clear" size="small"
          ><ion-icon
            :icon="addCircleOutline"
            :style="styleActiveTab"
            size="large"
          ></ion-icon
        ></ion-button>
      </ion-col>
      <ion-col>
        <ion-button router-link="/chat" fill="clear" size="small"
          ><ion-icon
            :icon="chatboxEllipsesOutline"
            size="large"
            class="tabbar-item"
          ></ion-icon
        ></ion-button>
        Chat
      </ion-col>
      <ion-col>
        <ion-button router-link="/profile" fill="clear" size="small"
          ><ion-icon
            :icon="personOutline"
            size="large"
            class="tabbar-item"
          ></ion-icon
        ></ion-button>

        Profil
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style>
.tabbar {
  background-color: #1f1f27;
  opacity: 0.9;
  border-radius: 10px;
  padding: 0;
}

ion-col {
  justify-items: center !important;
  align-items: center !important;
  text-align: center;
  padding-bottom: 0.5rem !important;
}

ion-icon {
  color: #ffffff !important;
}

ion-button:active {
  background-color: #1f1f27;
}
</style>
