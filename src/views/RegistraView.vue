<template>
  <div class="background">
    <div class="container">
      <div class="register-content">
        <div class="welcome-text">
          <h1>Registra</h1>
        </div>
        <form class="form" @submit.prevent="registra">
          <div class="form-group" :class="{ 'error': validationErrors.name }">
            <input
                id="name"
                v-model="name"
                type="text"
                placeholder=" "
                required
                class="input"
            />
            <label for="name" class="placeholder">Nome Utente</label>
            <div v-if="validationErrors.name" class="error-text">Campo obbligatorio</div>
          </div>

          <div class="form-group" :class="{ 'error': validationErrors.school }">
            <input
                id="school"
                v-model="school"
                type="text"
                placeholder=" "
                required
                class="input"
            />
            <label for="school" class="placeholder">Scuola</label>
            <div v-if="validationErrors.school" class="error-text">Campo obbligatorio</div>
          </div>

          <div class="form-group" :class="{ 'error': validationErrors.email }">
            <input
                id="email"
                v-model="email"
                type="email"
                placeholder=" "
                required
                class="input"
            />
            <label for="email" class="placeholder">Email</label>
            <div v-if="validationErrors.email" class="error-text">Campo obbligatorio</div>
          </div>

          <div class="form-group password-group" :class="{ 'error': validationErrors.password }">
            <input
                id="password"
                v-model="password"
                :type="password_visible ? 'text' : 'password'"
                placeholder=" "
                required
                class="input"
            />
            <label for="password" class="placeholder">Password</label>
            <div class="password-toggle" @click="cambia_icone_password">
              <svg
                  v-if="password_visible"
                  viewBox="0 0 640 512"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>

              <svg
                  v-else
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                />
              </svg>
            </div>
            <div v-if="validationErrors.password" class="error-text">Campo obbligatorio</div>
          </div>

          <label
              class="custum-file-upload"
              for="file"
              :class="{ 'uploading': isUploading, 'error': validationErrors.file }"
          >
            <div class="icon">
              <img v-if="previewImage" :src="previewImage" class="preview-image" />
              <div v-else-if="isUploading" class="loading-spinner"></div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043
                       3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228
                       21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19
                       3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569
                       1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19
                       14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954
                       21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076
                       12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091
                       23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11
                       16.5 11Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <div class="text">
              <span v-if="isUploading">Caricamento in corso...</span>
              <span v-else-if="previewImage">Immagine selezionata</span>
              <span v-else>Clicca per caricare un'immagine</span>
            </div>
            <div v-if="validationErrors.file" class="error-text">Immagine obbligatoria</div>
            <input type="file" id="file" @change="onFileChange" accept="image/*" />
          </label>

          <!-- Bottone Registrati -->
          <button
              class="login-button"
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              :class="{ 'disabled': !isFormValid || isSubmitting }"
          >
            <span v-if="isSubmitting" class="button-loading">
              <span class="spinner"></span> Registrazione in corso...
            </span>
            <span v-else>Registrati</span>
          </button>
        </form>

        <p class="p">Hai già un account? <router-link to="/login">Login</router-link></p>
      </div>

      <!-- Right side with image -->
      <div class="image-container">
        <div class="image-background">
          <img src="../assets/imgs/login.jpeg" alt="Email and clipboard illustration" class="decoration-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore.ts";
import { useFileStore } from "@/stores/fileStore.ts";
import router from "@/routers";

export default {
  name: "LoginView",
  setup() {
    const password_visible = ref(false);
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const school = ref("");
    const authStore = useAuthStore();
    const fileStore = useFileStore();
    const file = ref<File | null>(null);
    const fileUrl = ref<string | null>(null);
    const previewImage = ref<string | null>(null);
    const isUploading = ref(false);
    const isSubmitting = ref(false);
    const validationErrors = ref({
      name: false,
      school: false,
      email: false,
      password: false,
      file: false
    });

    // Controllo se il form è valido
    const isFormValid = computed(() => {
      return (
          name.value.trim() !== "" &&
          school.value.trim() !== "" &&
          email.value.trim() !== "" &&
          password.value.trim() !== "" &&
          file.value !== null &&
          !isUploading.value
      );
    });

    const cambia_icone_password = () => {
      password_visible.value = !password_visible.value;
    };

    const onFileChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        isUploading.value = true;
        file.value = target.files[0];

        // Verifica le dimensioni del file (max 5MB)
        if (file.value.size > 5 * 1024 * 1024) {
          alert("L'immagine è troppo grande. Dimensione massima: 5MB");
          file.value = null;
          if (previewImage.value) {
            URL.revokeObjectURL(previewImage.value);
            previewImage.value = null;
          }
          isUploading.value = false;
          return;
        }

        // Crea un URL per l'anteprima dell'immagine
        previewImage.value = URL.createObjectURL(file.value);

        // Simuliamo un breve caricamento per dare feedback all'utente
        setTimeout(() => {
          isUploading.value = false;
          validationErrors.value.file = false;
        }, 1000);
      }
    };

    const validateForm = () => {
      validationErrors.value = {
        name: name.value.trim() === "",
        school: school.value.trim() === "",
        email: email.value.trim() === "",
        password: password.value.trim() === "",
        file: file.value === null
      };

      return !Object.values(validationErrors.value).some(error => error);
    };

    const registra = async () => {
      if (!validateForm()) {
        return;
      }

      isSubmitting.value = true;

      try {
        await authStore.registra(email.value, password.value, name.value, school.value, "");

        if (file.value) {
          fileUrl.value = await fileStore.uploadFile(
              file.value,
              `${email.value}/profilePic`,
              "",
              ["profilePic"],
              ""
          );
          await authStore.updateUser(fileUrl.value);

          // Revoca l'URL dell'anteprima per liberare memoria
          if (previewImage.value) {
            URL.revokeObjectURL(previewImage.value);
          }
        }

        await router.push("/");
        location.reload();
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        alert("Si è verificato un errore durante la registrazione. Riprova più tardi.");
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      password_visible,
      cambia_icone_password,
      email,
      password,
      name,
      firstName,
      lastName,
      school,
      registra,
      onFileChange,
      file,
      fileUrl,
      previewImage,
      isUploading,
      isSubmitting,
      isFormValid,
      validationErrors,
    };
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Main container */
.background {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  display: flex;
  width: 80%;
  height: 90vh; /* Aumentata altezza per contenere tutto senza scrolling */
  max-width: 1200px;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Left side - Register form */
.register-content {
  flex: 0.4;
  padding: 1.5rem 3rem; /* Diminuito padding verticale */
  display: flex;
  flex-direction: column;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 30px 30px -20px;
  overflow-y: visible; /* Modificato da auto a visible */
}

/* Right side - Image section */
.image-container {
  flex: 0.6;
  position: relative;
  overflow: hidden;
  background-color: #dcedfc;
}

.image-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dcedfc;
}

.decoration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.welcome-text h1 {
  margin-top: 2%; /* Ridotto margine */
  text-align: center;
  font-weight: 900;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  color: rgb(16, 137, 211);
}

/* Form styling */
.form {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: 'DM Sans', sans-serif;
}

/* Floating label styling */
/* Imposta il background dell'etichetta in base al background del container */
.form-group {
  position: relative;
  margin-bottom: 15px; /* Ridotto spazio tra i campi */
  z-index: 0;
}

/* Impostazione del background per il container del form */
.register-content {
  flex: 0.4;
  padding: 1.5rem 3rem; /* Diminuito padding verticale */
  display: flex;
  flex-direction: column;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 30px 30px -20px;
  overflow-y: visible; /* Modificato da auto a visible */
}

.form-group .input {
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  padding: 12px 20px; /* Leggermente ridotto padding */
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  position: relative;
  z-index: 0;
  height: 46px; /* Altezza fissa per tutti gli input */
  line-height: 22px; /* Migliora l'allineamento del testo all'interno */
}

.form-group .input:focus {
  outline: none;
  border-color: #12B1D1;
}

.form-group .placeholder {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%); /* Centra verticalmente il testo */
  font-size: 14px;
  color: #aaa;
  transition: all 0.3s ease;
  pointer-events: none;
  background-color: transparent;
  z-index: 1; /* Livello sopra l'input */
}

.form-group .input:focus + .placeholder,
.form-group .input:not(:placeholder-shown) + .placeholder {
  top: -8px;
  left: 18px;
  font-size: 12px;
  padding: 0 6px;
  color: rgb(16, 137, 211);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 0 2px rgba(244, 247, 251, 0.8);
  transform: translateY(0); /* Rimuove la trasformazione quando fluttua */
  z-index: 3; /* Assicura che la label sia sopra il bordo dell'input */
}

/* Password field specific styling */
.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  background-color: rgba(239, 246, 255, 1);
}

.password-toggle svg {
  fill: #aaa;
  width: 18px;
  height: 18px;
  transition: fill 0.2s ease;
}

.password-toggle:hover svg {
  fill: rgb(16, 137, 211);
}

/* File upload styling */
.file-group {
  margin-top: 15px; /* Ridotto margine */
}

.file-label {
  display: block;
  margin-bottom: 8px; /* Ridotto margine */
  font-size: 14px;
  color: rgb(16, 137, 211);
}

.file-upload-container {
  width: 100%;
}

.custom-file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1rem; /* Ridotto padding */
  border-radius: 20px;
  box-shadow: 0px 10px 15px -10px rgba(133, 189, 215, 0.4);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.custom-file-upload:hover {
  border-color: #12B1D1;
  box-shadow: 0px 15px 20px -10px rgba(133, 189, 215, 0.6);
}

.custom-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px; /* Ridotto margine */
}

.custom-file-upload .icon svg {
  height: 30px; /* Leggermente più piccola icona */
  fill: rgb(16, 137, 211);
}

.custom-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-file-upload .text span {
  font-weight: 400;
  color: rgb(16, 137, 211);
  font-size: 14px;
}

.custom-file-upload input {
  display: none;
}

/* Button styling */
.login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: white;
  padding-block: 12px; /* Ridotto padding */
  margin: 18px auto 0 auto; /* Ridotto margine */
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.88) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 23px 10px -20px;
}

.login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 15px 10px -10px;
}

.p {
  text-align: center;
  font-size: 13px;
  color: #555;
  margin-top: 15px; /* Ridotto margine */
  font-family: 'DM Sans', sans-serif;
}

.p a {
  color: rgb(16, 137, 211);
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}

/* Responsive design */
@media (max-width: 992px) {
  .container {
    flex-direction: column;
    height: auto;
    width: 90%;
  }

  .register-content,
  .image-container {
    flex: none;
    width: 100%;
  }

  .register-content {
    max-width: 100%;
    padding: 1.5rem;
  }

  .image-container {
    height: 250px; /* Ridotta altezza */
    order: -1; /* Display image at the top on mobile */
  }
}

@media (max-width: 576px) {
  .register-content {
    padding: 1.5rem 1rem;
  }

  .image-container {
    height: 200px; /* Ridotta ulteriormente per mobile */
  }

  .container {
    width: 95%;
    height: auto;
  }

  .form-group .input {
    padding: 10px 15px;
  }
}

/* Upload image */
.custum-file-upload {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background: #fff;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 48px 35px -48px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  transition: all 0.3s ease;
}

.custum-file-upload.error {
  border: 2px dashed #ff3860;
  box-shadow: 0 48px 35px -48px rgba(255, 56, 96, 0.3);
}

.custum-file-upload.uploading {
  border-color: #1091d3;
  background-color: #f5faff;
}

.custum-file-upload .icon {
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 100%;
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .preview-image {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 50%;
}

.custum-file-upload input {
  display: none;
}

/* Spinner per caricamento immagine */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1091d3;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Button */
.login-button {
  display: block;
  width: 100%;
  margin: 2rem 0 0;
  padding: 15px;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.88) 0 20px 10px -15px;
  transition: all 0.2s;
  cursor: pointer;
}

.login-button:hover:not(.disabled) {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.88) 0 23px 10px -20px;
}

.login-button:active:not(.disabled) {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.88) 0 15px 10px -10px;
}

.login-button.disabled {
  background: linear-gradient(45deg, rgb(149, 186, 207) 0%, rgb(156, 208, 219) 100%);
  cursor: not-allowed;
  box-shadow: none;
}

/* Spinner nel bottone */
.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}
</style>