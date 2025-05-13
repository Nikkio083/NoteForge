<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import { useFileStore } from '@/stores/fileStore.js'
const fileStore = useFileStore();
const authStore = useAuthStore();
authStore.getRegisteredUsersCount();
fileStore.getNumFiles();




</script>

<template>

  <RouterView></RouterView>


</template>

<style scoped>

</style>