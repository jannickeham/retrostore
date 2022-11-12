<script setup lang="ts">
import { IonSpinner } from "@ionic/vue";

/*const loading = () => {
  if (loader.value == false) {
    loader.value = true;
  } else {
    loader.value = false;
  }
};*/
</script>
<template>
  <div>
    <div class="bg-loading"></div>
    <ion-spinner name="crescent" color="primary"></ion-spinner>
  </div>
</template>
<style>
ion-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  z-index: 10;
}

.bg-loading {
  background-color: #131313;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0;
}
</style>
