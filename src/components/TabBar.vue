<script setup lang="ts">
import { IonIcon, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import {
  addCircleOutline,
  personOutline,
  gameControllerOutline,
  gameController,
  person,
  addCircle,
} from "ionicons/icons";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const path = computed(() => route.path);
const currentRoute = path.value;
</script>

<template>
  <ion-grid :fixed="true">
    <ion-row class="tabbar ion-align-items-center ion-justify-items-center">
      <ion-col class="col">
        <ion-button
          class="column-item-pos"
          router-link="/home"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/home'"
            :icon="gameControllerOutline"
            size="large"
            class="white-imp"
          ></ion-icon>
          <ion-icon
            v-if="currentRoute === '/home'"
            :icon="gameController"
            size="large"
            class="icon-primary"
          ></ion-icon
        ></ion-button>
        Marked
      </ion-col>

      <ion-col class="col">
        <ion-button
          class="column-item-pos"
          router-link="/new-product"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/new-product'"
            :icon="addCircleOutline"
            size="large"
            class="icon-primary"
          ></ion-icon
          ><ion-icon
            v-if="currentRoute === '/new-product'"
            :icon="addCircle"
            size="large"
            class="icon-primary"
          ></ion-icon
        ></ion-button>
      </ion-col>

      <ion-col class="col">
        <ion-button
          router-link="/profile"
          class="flex"
          fill="clear"
          size="small"
          ><ion-icon
            v-if="currentRoute != '/profile'"
            :icon="personOutline"
            size="large"
            class="white-imp"
          ></ion-icon
          ><ion-icon
            v-if="currentRoute === '/profile'"
            :icon="person"
            size="large"
            class="icon-primary"
          ></ion-icon
        ></ion-button>

        Profil
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style></style>
