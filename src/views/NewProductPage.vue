<script setup lang="ts">
import {
  IonChip,
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
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { saveOutline, addCircleOutline, imageOutline } from "ionicons/icons";
import { ref } from "vue";
import { Camera, CameraResultType } from "@capacitor/camera";
import { directus } from "@/services/directus.service";
import { useRouter } from "vue-router";
import { setErrorHandler } from "ionicons/dist/types/stencil-public-runtime";
import TabBar from "@/components/TabBar.vue";
import { INewProduct } from "@/models/ProductModels";
import { numberLiteralTypeAnnotation } from "@babel/types";

const router = useRouter();
const isUploadingProduct = ref(false);

//Keeps track of the input field for new categories
const newCategoryText = ref("");

//Handles state of loader
//let loader = ref(false);

//Keeps track of all data input from user when adding new product
const newProduct = ref<INewProduct>({
  title: "",
  description: "",
  category: [],
  image: "",
  location: "",
  price: "",
});

//Add new category to newProduct
const addNewCategory = () => {
  console.log(newProduct.value.category);

  if (newProduct.value.category.length <= 3) {
    //checks if no categories where added
    if (newCategoryText.value) {
      newProduct.value.category.push(newCategoryText.value);
      newCategoryText.value = "";
    }
  } else {
    alert("du kan ikke legge til flere kategorier");
  }
};

//Handle POST
const postNewProduct = async () => {
  //If image is not chosen, show alert
  if (!newProduct.value.image) {
    const errorToast = await toastController.create({
      message: "Du må laste opp et bilde!",
      duration: 2500,
      position: "bottom",
      color: "danger",
    });
    await errorToast.present();
  }

  //Fetch the image, make it a blob, and
  try {
    isUploadingProduct.value = true;
    const response = await fetch(newProduct.value.image);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append("file", imageBlob);

    const fileUpload = await directus.files.createOne(formData);
    if (fileUpload) {
      //If uploaded image, then make new row in product
      await directus.items("product").createOne({
        title: newProduct.value.title,
        description: newProduct.value.description,
        category: newProduct.value.category,
        price: newProduct.value.price,
        location: newProduct.value.location,
        image: fileUpload.id,
      });

      const successToast = await toastController.create({
        message: "Teltplassen ble lastet opp!",
        duration: 1500,
        position: "bottom",
        color: "success",
      });

      await successToast.present();
    }
    isUploadingProduct.value = false;
  } catch (error) {
    const errorToast = await toastController.create({
      message: "Noe gikk galt ved opplasting av teltplass!",
      duration: 2500,
      position: "bottom",
      color: "danger",
    });
    await errorToast.present();
    console.error(error);
    isUploadingProduct.value = false;
  }
};

const triggerCamera = async () => {
  //Open camera in app, best quality, no editing, and get uri
  const photo = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
  });

  if (photo.webPath) {
    newProduct.value.image = photo.webPath; //Save URI to array
    //loading();
  }
};

// Handle (preview) image removal
const removeImagePreview = () => {
  newProduct.value.image = "";
};

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
        <ion-title>Legg til ny vare</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label color="light" position="stacked" placeholder="Tittel"
          >Tittel</ion-label
        >
        <ion-input
          placeholder="Tittel"
          v-model="newProduct.title"
          color="light"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label color="light" position="stacked" placeholder="Pris"
          >Pris</ion-label
        >
        <ion-input
          type="number"
          placeholder="Pris"
          v-model="newProduct.price"
          color="light"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label color="light" position="stacked" placeholder="Sted"
          >Sted</ion-label
        >
        <ion-input
          placeholder="Sted"
          v-model="newProduct.location"
          color="light"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-label color="light" position="stacked">Beskrivelse</ion-label>
        <ion-textarea
          color="light"
          placeholder="Beskrivelse av vare"
          v-model="newProduct.description"
        ></ion-textarea>
      </ion-item>

      <ion-item lines="none">
        <ion-label position="stacked" placeholder="Kategori" color="light"
          >Kategori</ion-label
        >
        <ion-input
          v-model="newCategoryText"
          placeholder="Maks fire kategorier"
          color="light"
        >
        </ion-input>
        <ion-button @click="addNewCategory" slot="end" size="default"
          >Legg til<ion-icon
            :icon="addCircleOutline"
            size="large"
            slot="end"
            color="light"
          ></ion-icon
        ></ion-button>
      </ion-item>

      <ion-item lines="none">
        <ion-chip
          color="primary"
          v-for="category in newProduct.category"
          :key="category"
          >{{ category }}</ion-chip
        >
      </ion-item>

      <ion-button
        @click="triggerCamera"
        color="#535569"
        class="image-picker"
        expand="block"
      >
        Velg fil eller ta bilde
        <ion-icon
          :icon="imageOutline"
          size="large"
          slot="end"
          color="white"
        ></ion-icon>
      </ion-button>
      <img :src="newProduct.image" />

      <ion-button @click="postNewProduct" expand="block"
        >Lagre
        <ion-icon
          :icon="saveOutline"
          size="small"
          slot="end"
          color="white"
        ></ion-icon
      ></ion-button>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style>
.image-picker {
  height: 20vh;
  margin: 10px;
  border: 2px #535569 dashed;
  background-color: #535569;
  font-size: medium;
  color: #ffffff;
  border-radius: 10px;
}

ion-item {
  margin-top: 1rem !important;
}
</style>
