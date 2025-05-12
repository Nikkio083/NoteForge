<script setup lang="ts">
import { ref } from "vue";
import FileViewer from "@/components/FileViewer.vue";

const title = ref("Nicola Amicone");
import {useAuthStore} from "@/stores/authStore.ts";
import {useFileStore} from "@/stores/fileStore.ts";
import NavBar from "@/components/NavBar.vue";

const email = ref("");
const password = ref("");
const firstname = ref("");
const lastname = ref("");
const school = ref("");
const authStore = useAuthStore();
const fileStore = useFileStore();
let fileUrl = ref();
const file = ref<File | null>(null);

const onPickFile = () => {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  fileInput?.click();
};

const onFilePicked = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    fileUrl.value = await (fileStore.uploadFile(file.value));
    console.log(fileUrl);
    console.log("Selected file:", file.value);
    console.log(file);
  }
};


</script>

<template>

  <input v-model="email" type="email" placeholder="E-mail">
  <input v-model="password" type="password" placeholder="Password">
  <input v-model="firstname" type="text" placeholder="Nome">
  <input v-model="lastname" type="text" placeholder="Cognome">
  <input v-model="school" type="text" placeholder="Scuola">
  <button @click="authStore.registra(email, password, firstname, lastname, school)">Registrati</button>
  <button @click="authStore.login(email, password)">Login</button>
  <button class="btn btn-info" @click="onPickFile">Upload profile picture</button>
  <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="*"
      @change="onFilePicked"/>


  <FileViewer v-if="fileUrl" :src="fileUrl.publicUrl"></FileViewer>

</template>

<style scoped>

</style>
