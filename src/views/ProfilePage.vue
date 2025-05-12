<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useFileStore } from "@/stores/fileStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import { ref, onMounted } from "vue";
import Footer from "@/components/footer.vue";

const fileStore = useFileStore();
const authStore = useAuthStore();

const user = authStore.user;

// Dati utente
const userProfile = ref({
  nome: user.user_metadata.firstName,
  cognome: user.user_metadata.lastname,
  email: user.user_metadata.email,
  telefono: user.user_metadata.tel,
  biografia: user.user_metadata.biografia,
  posizione: user.user_metadata.posizione,
  professione: user.user_metadata.profession,
  dataNascita: user.user_metadata.dataDiNascita,
  iscrittoDal: "Gennaio 2023",
  social: {
    linkedin: "https://linkedin.com/in/mariorossi",
    github: "https://github.com/mariorossi",
    twitter: "https://twitter.com/mariorossi"
  }
});

// Gestione modifica profilo
const isEditing = ref(false);
const editedProfile = ref({...userProfile.value});

const startEditing = () => {
  editedProfile.value = {...userProfile.value};
  isEditing.value = true;
};

const saveProfile = async () => {
  // Qui andrà la logica per salvare il profilo nel database
  userProfile.value = {...editedProfile.value};
  await authStore.updateUserData(userProfile.value.nome, userProfile.value.cognome, userProfile.value.email, userProfile.value.telefono, userProfile.value.dataNascita,  userProfile.value.professione, userProfile.value.posizione, userProfile.value.biografia);
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
};

// Gestione upload immagine profilo
const profileImageUrl = ref(user.user_metadata.profilePic.publicUrl); // URL dell'immagine di default

// Simulazione caricamento dati utente dal database
onMounted(() => {
  // In un'app reale, qui avresti una chiamata API per recuperare i dati del profilo
  console.log("Profilo utente caricato");
});
</script>

<template>
  <NavBar />
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="profile-title">Il mio profilo</h1>
      <p class="profile-subtitle">Gestisci le tue informazioni personali e di contatto</p>
    </div>

    <div class="profile-card">
      <div class="profile-sidebar">
        <div class="profile-image-container">
          <div class="profile-image">
            <img :src="profileImageUrl" alt="Immagine profilo" />
            <div class="profile-image-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Cambia foto</span>
            </div>
          </div>
        </div>

        <div class="profile-details">
          <h2 class="profile-name">{{ userProfile.nome }} {{ userProfile.cognome }}</h2>
          <p class="profile-job">{{ userProfile.professione }}</p>
          <p class="profile-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {{ userProfile.posizione }}
          </p>
          <p class="profile-member-since">Iscritto da {{ userProfile.iscrittoDal }}</p>
        </div>

        <div class="profile-social">
          <a :href="userProfile.social.linkedin" target="_blank" class="social-link linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a :href="userProfile.social.github" target="_blank" class="social-link github">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a :href="userProfile.social.twitter" target="_blank" class="social-link twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </div>
      </div>

      <div class="profile-main">
        <div class="profile-actions" v-if="!isEditing">
          <button @click="startEditing" class="edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Modifica profilo
          </button>
        </div>

        <!-- Visualizzazione profilo -->
        <div v-if="!isEditing" class="profile-info">
          <div class="info-section">
            <h3 class="section-title">Informazioni personali</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Nome</span>
                <span class="info-value">{{ userProfile.nome }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Cognome</span>
                <span class="info-value">{{ userProfile.cognome }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">{{ userProfile.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Telefono</span>
                <span class="info-value">{{ userProfile.telefono }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Data di nascita</span>
                <span class="info-value">{{ userProfile.dataNascita }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Professione</span>
                <span class="info-value">{{ userProfile.professione }}</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3 class="section-title">Biografia</h3>
            <div class="bio-content">
              <p>{{ userProfile.biografia }}</p>
            </div>
          </div>
        </div>

        <!-- Form di modifica profilo -->
        <div v-else class="profile-edit-form">
          <div class="form-section">
            <h3 class="section-title">Modifica informazioni personali</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" v-model="editedProfile.nome" />
              </div>
              <div class="form-group">
                <label for="cognome">Cognome</label>
                <input type="text" id="cognome" v-model="editedProfile.cognome" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="editedProfile.email" />
              </div>
              <div class="form-group">
                <label for="telefono">Telefono</label>
                <input type="tel" id="telefono" v-model="editedProfile.telefono" />
              </div>
              <div class="form-group">
                <label for="dataNascita">Data di nascita</label>
                <input type="text" id="dataNascita" v-model="editedProfile.dataNascita" />
              </div>
              <div class="form-group">
                <label for="professione">Professione</label>
                <input type="text" id="professione" v-model="editedProfile.professione" />
              </div>
              <div class="form-group">
                <label for="posizione">Posizione</label>
                <input type="text" id="posizione" v-model="editedProfile.posizione" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Biografia</h3>
            <div class="form-group">
              <textarea v-model="editedProfile.biografia" rows="4"></textarea>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Social Media</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="linkedin">LinkedIn</label>
                <input type="url" id="linkedin" v-model="editedProfile.social.linkedin" />
              </div>
              <div class="form-group">
                <label for="github">GitHub</label>
                <input type="url" id="github" v-model="editedProfile.social.github" />
              </div>
              <div class="form-group">
                <label for="twitter">Twitter</label>
                <input type="url" id="twitter" v-model="editedProfile.social.twitter" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button @click="cancelEditing" class="cancel-button">Annulla</button>
            <button @click="saveProfile" class="save-button">Salva modifiche</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer class="footer"/>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8faff 0%, #e3eaf7 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.profile-header {
  margin-bottom: 40px;
  text-align: center;
}

.profile-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.profile-subtitle {
  font-size: 1.1rem;
  color: #5f6368;
  max-width: 500px;
  line-height: 1.5;
}

.profile-card {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 1000px;
  display: flex;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.profile-sidebar {
  width: 280px;
  padding: 30px;
  background-color: #f8f9fa;
  border-right: 1px solid #ebedf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
}

.profile-image-container {
  position: relative;
  margin-bottom: 10px;
}

.profile-image {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}


.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-image-overlay svg {
  margin-bottom: 5px;
}

.profile-details {
  text-align: center;
  width: 100%;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 5px;
}

.profile-job {
  font-size: 1rem;
  font-weight: 500;
  color: #5f6368;
  margin-bottom: 10px;
}

.profile-location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.profile-member-since {
  font-size: 0.85rem;
  color: #868e96;
  margin-top: 5px;
}

.profile-social {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #6c757d;
  transition: all 0.3s ease;
  border: 1px solid #ebedf0;
}

.social-link:hover {
  transform: translateY(-3px);
}

.social-link.linkedin:hover {
  background-color: #0077b5;
  color: white;
  border-color: #0077b5;
}

.social-link.github:hover {
  background-color: #333;
  color: white;
  border-color: #333;
}

.social-link.twitter:hover {
  background-color: #1da1f2;
  color: white;
  border-color: #1da1f2;
}

.profile-main {
  flex: 1;
  padding: 40px;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #f0f4ff;
  border: 1px solid #d0d7f7;
  border-radius: 8px;
  color: #4285f4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background-color: #e3eafe;
  transform: translateY(-2px);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3c4043;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebedf0;
}

.info-section {
  margin-bottom: 30px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.info-value {
  font-size: 1rem;
  color: #212529;
  font-weight: 500;
}

.bio-content {
  color: #3c4043;
  line-height: 1.6;
}

/* Form di modifica */
.profile-edit-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-section {
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.form-group input, .form-group textarea {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #dfe1e5;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.25);
  background-color: white;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-button {
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #dfe1e5;
  background-color: white;
  color: #5f6368;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background-color: #f8f9fa;
}

.save-button {
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  background-color: #4285f4;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button:hover {
  background-color: #3b76d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 133, 244, 0.3);
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

.profile-title, .profile-subtitle {
  animation: fadeIn 0.7s ease-out forwards;
}

.profile-card {
  animation: fadeIn 0.7s 0.2s ease-out forwards;
  opacity: 0;
}

/* Responsive design */
@media (max-width: 900px) {
  .profile-card {
    flex-direction: column;
  }

  .profile-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ebedf0;
    padding-bottom: 30px;
  }

  .profile-main {
    padding: 30px;
  }
}

@media (max-width: 600px) {
  .profile-container {
    padding: 30px 16px 60px;
  }

  .profile-title {
    font-size: 2rem;
  }

  .profile-subtitle {
    font-size: 1rem;
  }

  .info-grid, .form-grid {
    grid-template-columns: 1fr;
  }

  .profile-image {
    width: 130px;
    height: 130px;
  }

  .profile-card {
    border-radius: 16px;
  }

  .edit-button {
    padding: 8px 14px;
    font-size: 13px;
  }
}
</style>