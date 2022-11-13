<script setup lang="ts">
import {
  IonSpinner,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  toastController,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import {
  saveOutline,
  addCircleOutline,
  imageOutline,
  trashOutline,
} from "ionicons/icons";
import { ref } from "vue";
import { Camera, CameraResultType } from "@capacitor/camera";
import { directus } from "@/services/directus.service";
import { useRouter } from "vue-router";

import TabBar from "@/components/TabBar.vue";
import { INewProduct } from "@/models/ProductModels";

const router = useRouter();

const isUploadingProduct = ref(false);
let isLoading = ref(false);

//Keeps track of the input field for new categories
const newCategoryText = ref("");

let errorMessage = ref(false);

const handleErrorMessage = () => {
  errorMessage.value = true;
};

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
const addNewCategory = async () => {
  console.log(newProduct.value.category);

  if (newProduct.value.category.length <= 3) {
    //checks if no categories where added
    if (newCategoryText.value) {
      newProduct.value.category.push(newCategoryText.value);
      newCategoryText.value = "";
    }
  } else {
    const errorToast = await toastController.create({
      message: "Du kan legge til maks fire kategorier!",
      duration: 2500,
      position: "middle",
      color: "primary",
    });
    await errorToast.present();
  }
};

//Handle POST
const postNewProduct = async () => {
  //If image is not chosen, show alert
  if (!newProduct.value.image) {
    const errorToast = await toastController.create({
      message: "Du må laste opp et bilde!",
      duration: 2500,
      position: "middle",
      color: "primary",
    });
    await errorToast.present();
  }

  if (
    !newProduct.value.title ||
    !newProduct.value.description ||
    !newProduct.value.location ||
    !newProduct.value.category ||
    !newProduct.value.price
  ) {
    errorMessage.value = true;
  }

  //Fetch the image, make it a blob
  try {
    isLoading.value = true;
    isUploadingProduct.value = true;
    const response = await fetch(newProduct.value.image);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append("file", imageBlob);

    const fileUpload = await directus.files.createOne(formData);
    if (
      fileUpload &&
      newProduct.value.title != "" &&
      newProduct.value.description != "" &&
      newProduct.value.price != "" &&
      newProduct.value.location != "" &&
      newProduct.value.category
    ) {
      //If uploaded image, then make new row in product
      await directus.items("product").createOne({
        title: newProduct.value.title,
        description: newProduct.value.description,
        category: newProduct.value.category,
        price: newProduct.value.price,
        location: newProduct.value.location,
        image: fileUpload.id,
      });

      isLoading.value = false;
      const successToast = await toastController.create({
        message: "Produktet ble lastet opp!",
        duration: 1500,
        position: "bottom",
        color: "primary",
      });

      await successToast.present();
      router.replace("/home");
    }
    isUploadingProduct.value = false;
    isLoading.value = false;
  } catch (error) {
    const errorToast = await toastController.create({
      message: "Noe gikk galt ved opplasting!",
      duration: 2500,
      position: "bottom",
      color: "primary",
    });
    await errorToast.present();
    console.error(error);
    isUploadingProduct.value = false;
    isLoading.value = false;
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
  }
};

// Remove image
const removeImagePreview = () => {
  newProduct.value.image = "";
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
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

      <ion-item>
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

      <p class="margin-vertical-103 normal-text">Bilde</p>
      <ion-button
        v-if="!newProduct.image"
        @click="triggerCamera"
        color="#535569"
        class="image-picker margin-vertical-1"
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

      <div class="image-container" v-if="newProduct.image">
        <img
          class="image-preview"
          :src="newProduct.image"
          alt="Forhåndsvisning av valgt bilde"
        />
        <ion-button
          @click="removeImagePreview"
          fill="outline"
          class="remove-image-preview-btn text-white"
          >Fjern bilde
          <ion-icon slot="end" :icon="trashOutline" color="primary"></ion-icon>
        </ion-button>
      </div>
      <div v-if="errorMessage" class="flex-center">
        <p class="text-primary">*Obs! Du må fylle ut alle felt</p>
      </div>

      <ion-button
        v-if="!isLoading"
        @click="postNewProduct"
        class="margin-vertical-1"
        expand="block"
        >Lagre
        <ion-icon
          :icon="saveOutline"
          size="small"
          slot="end"
          color="white"
        ></ion-icon
      ></ion-button>
      <div v-if="isLoading" class="flex-center">
        <ion-spinner
          class="upload-spinner"
          name="crescent"
          color="primary"
        ></ion-spinner>
      </div>
    </ion-content>
    <ion-footer>
      <TabBar></TabBar>
    </ion-footer>
  </ion-page>
</template>

<style></style>
