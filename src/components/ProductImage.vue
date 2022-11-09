<script setup lang="ts">
interface Props {
  imageId: string;
}

const userAccessToken = localStorage.getItem("auth_token");

defineProps<Props>();
</script>

<template>
  <img
    :src="`https://v6a8qmt5.directus.app/assets/${imageId}?access_token=${userAccessToken}`"
  />
</template>
