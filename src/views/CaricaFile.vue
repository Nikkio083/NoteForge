<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import { useFileStore } from "@/stores/fileStore.ts";
import { ref } from "vue";
import foo from "../components/footer.vue";

const fileStore = useFileStore();
const title = ref("");
const description = ref("");
const tags = ref<string | string[]>("");
let fileUrl = ref();
const previewUrl = ref(""); // Aggiunto per memorizzare l'URL dell'anteprima
const file = ref<File | null>(null);
const isConverting = ref(false);
const conversionMessage = ref("");

const onPickFile = () => {
  const fileInput = document.querySelector(
      'input[type="file"]'
  ) as HTMLInputElement;
  fileInput?.click();
};

const onFilePicked = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];

    // Preparazione dei tags
    if (typeof tags.value === "string") {
      tags.value = tags.value.split(",").map((tag) => tag.trim());
    }

    // Invio al server di conversione
    conversionMessage.value = "Conversione in corso...";
    isConverting.value = true;

    const formData = new FormData();
    formData.append("file", file.value);

    try {
      // 1. Richiesta di conversione al server
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Errore nella conversione: ${response.status}`);
      }

      const result = await response.json();
      conversionMessage.value =
          "Conversione completata! Caricamento sul database in corso...";

      console.log("PDF URL:", result.pdfUrl);
      console.log("Preview URL:", result.previewUrl);

      // 2. Scarica il PDF dal server
      const pdfResponse = await fetch(`http://localhost:3000${result.pdfUrl}`);
      if (!pdfResponse.ok) {
        throw new Error("Impossibile scaricare il PDF generato");
      }
      const pdfBlob = await pdfResponse.blob();
      const pdfFileName = result.pdfUrl.split("/").pop();
      const pdfFile = new File([pdfBlob], pdfFileName, {
        type: "application/pdf",
      });

      // 3. Scarica l'anteprima dal server
      const previewResponse = await fetch(`http://localhost:3000${result.previewUrl}`);
      if (!previewResponse.ok) {
        throw new Error("Impossibile scaricare l'anteprima generata");
      }
      const previewBlob = await previewResponse.blob();
      const previewFileName = result.previewUrl.split("/").pop();
      const previewFile = new File([previewBlob], previewFileName, {
        type: "image/jpeg",
      });
      const previewFileUrl = await fileStore.uploadFile(
          previewFile,
          `${title.value}/preview`,
          "",
          ["preview"],
          ""
      );

      // 4. Carica entrambi i file sul database
      // Assumendo che fileStore.uploadFile sia stato modificato per accettare anche l'anteprima
      // Oppure creare un nuovo metodo per caricare entrambi i file

      fileUrl.value = await fileStore.uploadFile(
          pdfFile,
          title.value,
          description.value,
          Array.isArray(tags.value) ? tags.value.map(tag => tag.toLowerCase()) : tags.value.toLowerCase(),
          previewFileUrl.publicUrl // Aggiunto il file dell'anteprima
      );

      conversionMessage.value =
          "Operazione completata! PDF e anteprima caricati nel database.";

      console.log("PDF caricato sul database:", fileUrl.value);
      console.log("Anteprima caricata sul database:", previewUrl.value);

    } catch (error) {
      conversionMessage.value = `Errore: ${
          error instanceof Error ? error.message : "Errore sconosciuto"
      }`;
      console.error("Errore durante l'operazione:", error);
    } finally {
      isConverting.value = false;
    }
  }
  const fileInput = ref(null);
  const onPickFile = () => {
    fileInput.value?.click();
  };

};
</script>
<template>
  <NavBar />
  <div class="upload-container">
    <h1 class="upload-title">Carica il tuo documento</h1>

    <div class="upload-form">
      <input v-model="title"
             type="text" placeholder="Titolo del file" />
      <input v-model="description" type="text" placeholder="Descrizione" />
      <input v-model="tags" type="text" placeholder="Tag (separati da virgola)" />

      <div class="dropzone" @click="onPickFile">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4a4a4a"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span class="dropzone-text">Clicca qui per caricare il file</span>
      </div>

      <input type="file" ref="fileInput" accept="*" @change="onFilePicked" />

      <div
          v-if="conversionMessage"
          class="conversion-message"
          :class="{ error: conversionMessage.includes('Errore') }"
      >
        {{ conversionMessage }}
      </div>
    </div>
  </div>
  <foo class="footer"/>
</template>


<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8faff 0%, #c3cfe2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.upload-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.upload-subtitle {
  font-size: 1.1rem;
  color: #5f6368;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
  line-height: 1.5;
}

.upload-form {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.upload-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05);
}

.upload-form input[type="text"] {
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid #dfe1e5;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.upload-form input[type="text"]:hover {
  background-color: #f1f3f4;
}

.upload-form input[type="text"]:focus {
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.upload-form input[type="file"] {
  display: none;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2.5px dashed #dadce0;
  border-radius: 20px;
  background-color: #f8f9fa;
  height: 260px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.3, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.dropzone:hover {
  background-color: #e8f0fe;
  border-color: #4285f4;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(66, 133, 244, 0.15);
}

.dropzone::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.dropzone:hover::before {
  opacity: 1;
}

.dropzone svg {
  transition: transform 0.4s ease, stroke 0.3s ease;
  stroke: #5f6368;
  stroke-width: 1.8;
}

.dropzone:hover svg {
  transform: translateY(-5px) scale(1.15);
  stroke: #4285f4;
}

.dropzone-text {
  margin-top: 24px;
  color: #3c4043;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
}

.dropzone:hover .dropzone-text {
  color: #1a73e8;
  transform: translateY(-3px);
}

.conversion-message {
  margin-top: 20px;
  padding: 18px 24px;
  border-radius: 16px;
  background-color: #e6f4ea;
  color: #1e8e3e;
  border: 1px solid #b7e1c5;
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.conversion-message.error {
  background-color: #fce8e6;
  color: #d93025;
  border: 1px solid #f5c2bd;
}

.conversion-message:empty {
  display: none;
}

.footer {
  margin-top: auto;
  width: 100%;
}

/* Animazioni */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.upload-title {
  animation: fadeIn 0.7s ease-out forwards;
}

.upload-subtitle {
  animation: fadeIn 0.7s 0.1s ease-out forwards;
  opacity: 0;
}

.upload-form {
  animation: scaleIn 0.8s 0.2s ease-out forwards;
  opacity: 0;
}

/* Responsive design */
@media (max-width: 600px) {
  .upload-container {
    padding: 30px 16px 60px;
  }

  .upload-title {
    font-size: 2rem;
  }

  .upload-subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .upload-form {
    padding: 30px 24px;
    border-radius: 16px;
    gap: 20px;
  }

  .dropzone {
    height: 220px;
    border-radius: 16px;
  }

  .dropzone-text {
    font-size: 16px;
  }

  .conversion-message {
    padding: 15px 20px;
    font-size: 15px;
  }
}
</style>