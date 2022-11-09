<script setup lang="ts">
import { IonIcon, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import {
  addCircleOutline,
  searchOutline,
  chatboxEllipsesOutline,
  personOutline,
  search,
  chatboxEllipses,
  gameControllerOutline,
  gameController,
  person,
  addCircle,
} from "ionicons/icons";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { ref } from "vue";
//import { defineProps } from "vue";

/*interface Props {
  userAccessToken: boolean;
}*/

// How to get current routing
//https://stackoverflow.com/questions/65989489/best-way-to-get-current-route-in-vue3-and-vue-router

const route = useRoute();
//const userAccessToken = localStorage.getItem("auth_token");

const path = computed(() => route.path);
const currentRoute = path.value;
console.log(currentRoute);

//defineProps<Props>();
</script>

<template>
  <ion-grid :fixed="true">
    <ion-row class="tabbar ion-align-items-center ion-justify-items-center">
      <ion-col>
        <ion-button
          class="column-item-pos"
          router-link="/home"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/home'"
            :icon="gameControllerOutline"
            size="large"
            class="tab-icon"
          ></ion-icon>
          <ion-icon
            v-if="currentRoute === '/home'"
            :icon="gameController"
            size="large"
            class="active-color"
          ></ion-icon
        ></ion-button>
        Marked
      </ion-col>

      <ion-col>
        <ion-button
          class="column-item-pos"
          router-link="/new-product"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/new-product'"
            :icon="addCircleOutline"
            size="large"
            class="active-color"
          ></ion-icon
          ><ion-icon
            v-if="currentRoute === '/new-product'"
            :icon="addCircle"
            size="large"
            class="active-color"
          ></ion-icon
        ></ion-button>
      </ion-col>

      <ion-col>
        <ion-button
          router-link="/profile"
          class="column-item-pos"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/profile'"
            :icon="personOutline"
            size="large"
            class="tab-icon"
          ></ion-icon
          ><ion-icon
            v-if="currentRoute === '/profile'"
            :icon="person"
            size="large"
            class="active-color"
          ></ion-icon
        ></ion-button>

        Profil
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style>
.column-item-pos {
  display: flex;
}

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

.tab-icon {
  color: #ffffff !important;
}

.active-color {
  color: #e85112;
}

ion-button:active {
  background-color: #1f1f27;
}
</style>
