<template>
  <div class="view-page">
    <NavBar />

    <div class="main-content">
      <!-- PDF Viewer -->
      <div class="pdf-viewer">
        <PdfEmbed
            :source="Url"
            class="pdf-document"
        />
      </div>


      <Suspense>
        <!-- Sidebar con informazioni -->
        <div class="sidebar-wrapper">
          <FileSideBar :file="file" />
        </div>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import FileSideBar from '@/components/FileSideBar.vue'
import { useFileStore } from "@/stores/fileStore.js";
import { onMounted, computed } from "vue";
import PdfEmbed from 'vue-pdf-embed'
import NavBar from "@/components/NavBar.vue";

const fileStore = useFileStore();
const file = computed(() => fileStore.currentFile);
const Url = computed(() => file.value?.link || '');

onMounted(() => {
  if(localStorage.getItem('currentFile') !== null){
    fileStore.setCurrentFile(JSON.parse(localStorage.getItem('currentFile')));
  } else {
    console.log('Nessun file caricato');
  }
  console.log('File caricato:', file.value);
})
</script>

<style scoped>
.view-page {
  min-height: 100vh;
  background-color: #f5f7fb;
  display: flex;
  flex-direction: column;
}

.main-content {
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  padding: 1rem;
  gap: 1rem;
  top: 8%;
  height: calc(100vh - 64px); /* Regola in base all'altezza della NavBar */
}

.pdf-viewer {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 50vh;
}

.pdf-document {
  width: 100%;
  height: 100%;
}

.sidebar-wrapper {
  width: 100%;
  height: auto;
}

/* Layout desktop */
@media (min-width: 768px) {
  .main-content {
    flex-direction: row;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .pdf-viewer {
    height: auto;
    flex: 1;
  }

  .sidebar-wrapper {
    width: 320px;
    height: auto;
    min-height: 100%;
  }
}

/* Schermi grandi */
@media (min-width: 1280px) {
  .main-content {
    padding: 2rem;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }

  .sidebar-wrapper {
    width: 360px;
  }
}
</style>