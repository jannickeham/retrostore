<script setup lang="ts">
interface Props {
  imageId: string;
}

defineProps<Props>();
</script>

<template>
  <img
    :src="`https://v6a8qmt5.directus.app/assets/${imageId}`"
    alt="Bilde av produkt"
  />
</template>
