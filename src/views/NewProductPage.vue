<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  IonSpinner,
  toastController,
  IonToast,
  IonText,
} from "@ionic/vue";
import { ref } from "vue";
//import { Camera, CameraResultType } from "@capacitor/camera";
//import { directus } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { setErrorHandler } from "ionicons/dist/types/stencil-public-runtime";

const router = useRouter();

//Keeps track of the input field for new hashtags
const newCategoryText = ref([]);

//Handles state of toast
//let setOpen = ref(false);
//let setError = ref(false);

//Handles state of loader
//let loader = ref(false);

//Keeps track of all data input from user when adding new product
const newProduct = ref({
  title: "",
  description: "",
  category: [],
  image: "",
});

//Add new hashtags to newcampspot
/*const addNewCategory = () => {
  //Avoid adding empty hashtags
  if (newCategoryText.value) {
    newProduct.value.category.push(newCategoryText.value);
    newCategoryText.value = "";
  }
};*/

//Handle POST
//const postNewCampSpot = async () => {
//If image is not chosen, show alert
//if (!newCampSpot.value.image) {
//setError.value = true;
//}

//Fetch the image, make it a blob, and
/*try {
    const response = await fetch(newCampSpot.value.image);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append("file", imageBlob);

    const fileUpload = await directus.files.createOne(formData);
    if (fileUpload) {
      //If uploaded image, then make new row in camp_spots
      await directus.items("camp_spots").createOne({
        title: newCampSpot.value.title,
        description: newCampSpot.value.description,
        hasgtags: newCampSpot.value.hashtags,
        comments: [],
        image: fileUpload.id,
      });

      setOpen.value = true;
      newCampSpot.value.title = "";
      newCampSpot.value.description = "";
      newCampSpot.value.hashtags = [];
      newCampSpot.value.image = "";
    }
  } catch (error) {
    console.error(error);
  }
};*/

/*const triggerCamera = async () => {
  const photo = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
  }); //Open camera in app, best quality, no editing, and get uri

  if (photo.webPath) {
    newCampSpot.value.image = photo.webPath; //Save URI to array
    //loading();
  }
};*/

/*const loading = () => {
  if (loader.value == false) {
    loader.value = true;
  } else {
    loader.value = false;
  }
};*/
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>RetroStore</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="floating" placeholder="Tittel">Tittel</ion-label>
        <ion-input placeholder="Tittel" v-model="newProduct.title"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Beskrivelse</ion-label>
        <ion-textarea
          placeholder="Gi en beskrivelse av varen"
          v-model="newProduct.description"
        ></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-label position="floating" placeholder="Kategori"
          >Ny kategori</ion-label
        >
        <ion-input placeholder="Gi varen kategorier"> </ion-input>
        <ion-button slot="end" size="default" color="warning">+</ion-button>
      </ion-item>

      <ion-item
        ><ion-button
          shape="round"
          color="warning"
          size="small"
          fill="outline"
          v-for="category in newProduct.category"
          :key="category"
          >{{ category }}</ion-button
        ></ion-item
      >

      <ion-button color="light" class="image-picker">
        Velg fil eller ta bilde
      </ion-button>
      <img :src="newProduct.image" />
      <ion-button expand="block" color="warning">Legg til salgs</ion-button>
    </ion-content>
  </ion-page>
</template>

<style>
.image-picker {
  height: 20vh;
  margin: 10px;
  border: 2px #7f7f7f dashed;
  background-color: #131313;
  font-size: medium;
}
</style>
