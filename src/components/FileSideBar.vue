<template>
  <aside class="file-sidebar">
    <!-- Header con immagine profilo, titolo e autore -->
    <div class="sidebar-header">
      <div class="header-content">
        <div class="avatar-container">
          <div class="avatar"><img class="avatar" :src="file.authorPic" alt="IMG"></div>
        </div>
        <div class="title-container">
          <h2 class="file-title">{{ file.title }}</h2>
          <div class="author">
            <span class="username">{{ file.author }}</span>
          </div>
        </div>
      </div>

      <!-- Menu azioni rapide -->
      <div class="action-buttons">
        <button @click="download(file.link, file.title, file)" class="action-btn download-btn" title="Scarica">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </button>
        <button @click="saveToClipBoard(file.link)" class="action-btn share-btn" title="Condividi">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </button>
      </div>
    </div>

    <!-- Tabs di navigazione -->
    <div class="sidebar-tabs">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
      >
        <span class="tab-icon" v-html="tab.icon"></span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Contenuto del tab attivo -->
    <div class="sidebar-content">
      <!-- Tab Info -->
      <div v-if="activeTab === 'info'" class="tab-content">
        <!-- Valutazione e metriche -->
        <div class="metrics-card">
          <div class="metrics-row">
            <div class="metric">
              <div class="metric-value">{{ file.views || 0 }}</div>
              <div class="metric-label">Visualizzazioni</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ file.downloads || 0 }}</div>
              <div class="metric-label">Download</div>
            </div>
          </div>

          <div class="rating-bar">
            <div class="likes-container">
              <button class="like-btn" :class="{ active: userLiked }" @click="toggleLike">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                <span>{{ file.likes || 0 }}</span>
              </button>
              <button class="dislike-btn" :class="{ active: userDisliked }" @click="toggleDislike">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm10-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>
                <span>{{ file.dislikes || 0 }}</span>
              </button>
            </div>
            <div class="rating-progress" :style="{ width: likePercentage + '%' }"></div>
          </div>
        </div>

        <!-- Descrizione -->
        <section class="info-section">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Descrizione
          </h3>
          <p class="section-text">{{ file.description || 'Nessuna descrizione disponibile.' }}</p>
        </section>

        <!-- Tags -->
        <section class="info-section">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            Tags
          </h3>
          <div class="tags">
            <span v-for="tag in file.tags" :key="tag" class="tag">{{ tag }}</span>
            <span v-if="!file.tags || file.tags.length === 0" class="no-tags">Nessun tag</span>
          </div>
        </section>

        <!-- Info aggiuntive -->
        <section class="info-section">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Dettagli
          </h3>
          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Caricato il</span>
              <span class="detail-value">{{ formatDate(file.created_at) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Aggiornato il</span>
              <span class="detail-value">{{ file.updated_at ? formatDate(file.updated_at) : 'Mai aggiornato' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Dimensione</span>
              <span class="detail-value">{{ formatFileSize(file.size) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Formato</span>
              <span class="detail-value">{{ file.format || getFormatFromFilename(file.title) }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Tab Commenti -->
      <div v-if="activeTab === 'comments'" class="tab-content">
        <div class="comments-header">
          <h3 class="comments-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Commenti
            <span class="comments-count">{{ file.comments?.length || 0 }}</span>
          </h3>
        </div>

        <!-- Lista commenti -->
        <div class="comments-list">
          <div v-if="!file.comments || file.comments.length === 0" class="no-comments">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <p>Nessun commento. Sii il primo!</p>
          </div>
          <div v-for="(comment, index) in file.comments" :key="index" class="comment">
            <div class="comment-header">
              <div class="comment-avatar"><img alt="IMG" class="comment-avatar" :src="comment.commentAuthorPic"></div>
              <div class="comment-author">{{ comment.commentAuthor }}</div>
              <div class="comment-date">{{ formatTimeAgo(comment.commentDate) }}</div>
            </div>
            <div class="comment-content">
              <p class="comment-text">{{ comment.comment }}</p>
            </div>
            <div class="comment-actions">
              <button class="comment-action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                <span>{{ comment.likes || 0 }}</span>
              </button>
              <button class="comment-action-btn reply-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                <span>Rispondi</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Form commenti -->
        <div class="comment-form">
          <div class="form-header">
            <div class="user-avatar"><img v-if="user" alt="IMG" class="user-avatar" :src="user.user_metadata.profilePic.publicUrl"></div>
            <span class="form-title">Aggiungi un commento</span>
          </div>
          <textarea
              class="comment-input"
              rows="2"
              placeholder="Scrivi un commento..."
              v-model="currentComment"
          ></textarea>
          <div class="form-footer">
            <button
                class="comment-submit"
                @click="addComment"
                :disabled="!currentComment.trim()"
            >
              Invia
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Documenti correlati -->
      <div v-if="activeTab === 'related'" class="tab-content">
        <div class="related-header">
          <h3 class="related-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
            Documenti correlati
          </h3>
        </div>

        <div class="related-files">
          <div v-if="!relatedFiles || relatedFiles.length === 0" class="no-related">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <p>Nessun documento correlato</p>
          </div>
          <div @click="fileStore.setCurrentFile(relatedFile)" v-for="(relatedFile, index) in relatedFiles" :key="index" class="related-file">
            <div class="file-icon" :class="getFileIconClass(relatedFile.format)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            </div>
            <div class="file-details">
              <div class="file-name">{{ relatedFile.title }}</div>
              <div class="file-info">
                <span class="file-author">{{ relatedFile.author }}</span>
                <span class="file-date">{{ formatTimeAgo(relatedFile.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useFileStore } from "@/stores/fileStore";
import { ref, computed } from "vue";
import {useAuthStore} from "@/stores/authStore.js";
const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
});

console.log(props.file);

const fileStore = useFileStore();
const authStore = useAuthStore();
const user = authStore.user;
const currentComment = ref('');
const activeTab = ref('info');
const userLiked = ref(false);
const userDisliked = ref(false);

const download = (url, title, file) => {
  fileStore.addDownload(file);
  fileStore.downloadfile(url, title);
}

// Tabs disponibili
const tabs = [
  {
    id: 'info',
    label: 'Info',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  },
  {
    id: 'comments',
    label: 'Commenti',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
  },
  {
    id: 'related',
    label: 'Correlati',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>'
  }
];
const saveToClipBoard = (link) => {
  navigator.clipboard.writeText(link)
      .then(() => {})
      .catch(err => {
        console.error('Errore durante la copia:', err);
      });
};
// Dati di esempio per i file correlati




const relatedFiles = ref([]);

import { watch } from "vue";

watch(
    () => props.file,
    async (newFile) => {
      if (newFile?.tags?.length > 0) {
        relatedFiles.value = await fileStore.searchFileByTag(newFile.tags[0].toString(), newFile.id);
      }
    },
    { immediate: true }
);

console.log(relatedFiles);
// Calcola la percentuale dei like
const likePercentage = computed(() => {
  const likes = props.file.likes || 0;
  const dislikes = props.file.dislikes || 0;
  const total = likes + dislikes;
  return total === 0 ? 50 : Math.round((likes / total) * 100);
});

function formatDate(dateStr) {
  if (!dateStr) return 'Data non disponibile';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('it-IT', options);
}

function formatTimeAgo(date) {
  if (!date) return '';

  const now = new Date();
  const commentDate = new Date(date);
  const diffMs = now - commentDate;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) return 'poco fa';
  if (diffMin < 60) return `${diffMin} min fa`;
  if (diffHour < 24) return `${diffHour} ore fa`;
  if (diffDay < 30) return `${diffDay} giorni fa`;

  return formatDate(date);
}

function formatFileSize(bytes) {
  if (!bytes) return 'N/D';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function getFormatFromFilename(filename) {
  if (!filename) return 'N/D';
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'N/D';
}

function getFileIconClass(format) {
  if (!format) return '';

  format = format.toLowerCase();
  if (['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'].includes(format)) {
    return `format-${format}`;
  }
  return '';
}

function getInitials(name) {
  if (!name) return '?';

  return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
}

function addComment() {
  fileStore.addComment(currentComment.value, props.file);
  currentComment.value = '';
}

function toggleLike() {
  userLiked.value = !userLiked.value;
  if (userLiked.value && userDisliked.value) {
    userDisliked.value = false;
  }
  fileStore.likeFile(props.file.id);
  fileStore.getLikes(fileStore.currentFile)

  // Qui andrebbe la logica per aggiornare i like nel database
}

function toggleDislike() {
  userDisliked.value = !userDisliked.value;
  if (userDisliked.value && userLiked.value) {
    userLiked.value = false;
  }
  fileStore.dislikeFile(props.file.id);
  fileStore.getDislikes(fileStore.currentFile)


  // Qui andrebbe la logica per aggiornare i dislike nel database
}
</script>

<style scoped>
.file-sidebar {
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
  0 9px 28px 0 rgba(0, 0, 0, 0.05),
  0 12px 48px 16px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Header */
.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.title-container {
  flex-grow: 1;
  min-width: 0;
}

.file-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  display: flex;
  align-items: center;
}

.username {
  font-size: 0.875rem;
  color: #64748b;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  align-self: flex-end;
  margin-top: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #f8fafc;
  color: #4f46e5;
}

/* Tabs di navigazione */
.sidebar-tabs {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f8fafc;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 0.5rem;
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn.active {
  color: #4f46e5;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 25%;
  width: 50%;
  height: 2px;
  background-color: #4f46e5;
  border-radius: 2px;
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Contenuto principale */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.tab-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Card metriche */
.metrics-card {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metrics-row {
  display: flex;
  justify-content: space-between;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.metric-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.rating-bar {
  position: relative;
  height: 36px;
  background-color: #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.rating-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #4ade80;
  transition: width 0.3s ease;
}

.likes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
}

.like-btn, .dislike-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #1e293b;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.like-btn:hover, .dislike-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.like-btn.active {
  color: #4ade80;
}

.dislike-btn.active {
  color: #f43f5e;
}

/* Info Section */
.info-section {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.section-text {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: #f1f5f9;
  color: #334155;
  cursor: pointer;
}

.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: #e2e8f0;
}

.no-tags {
  font-size: 0.875rem;
  color: #94a3b8;
  font-style: italic;
}

/* Details */
.details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #e2e8f0;
}

.detail-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-label {
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  color: #334155;
  font-weight: 500;
}

/* Comments Tab */
.comments-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.comments-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comments-count {
  background-color: #e0e7ff;
  color: #4f46e5;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.no-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 0;
  color: #94a3b8;
  text-align: center;
}

.no-comments svg {
  opacity: 0.3;
}

.comment {
  background-color: #f8fafc;
  border-color: lightblue;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #cbd5e1;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.comment-author {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  flex-grow: 1;
}

.comment-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.comment-content {
  margin-bottom: 0.75rem;
}

.comment-text {
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.5;
  margin: 0;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 0.75rem;
}

.comment-action-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}

.comment-action-btn:hover {
  color: #4f46e5;
}

.reply-btn {
  margin-left: auto;
}

.comment-form {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.form-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.comment-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  resize: vertical;
  background-color: white;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.comment-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
}

.comment-submit {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.comment-submit:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-submit:disabled {
  background-color: #c7d2fe;
  cursor: not-allowed;
}

/* Related Files Tab */
.related-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.related-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.related-files {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.no-related {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 0;
  color: #94a3b8;
  text-align: center;
}

.no-related svg {
  opacity: 0.3;
}

.related-file {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  cursor: pointer;
}

.related-file:hover {
  background-color: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.format-pdf {
  background-color: #fee2e2;
  color: #ef4444;
}

.format-doc, .format-docx {
  background-color: #dbeafe;
  color: #3b82f6;
}

.format-ppt, .format-pptx {
  background-color: #ffedd5;
  color: #f97316;
}

.format-xls, .format-xlsx {
  background-color: #dcfce7;
  color: #22c55e;
}

.file-details {
  flex-grow: 1;
  min-width: 0;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
}

.file-author {
  font-size: 0.75rem;
  color: #64748b;
}

.file-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Scroll custom styling */
.sidebar-content::-webkit-scrollbar,
.comments-list::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track,
.comments-list::-webkit-scrollbar-track {
  background-color: #f1f5f9;
  border-radius: 8px;
}

.sidebar-content::-webkit-scrollbar-thumb,
.comments-list::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 8px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover,
.comments-list::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

/* Media Queries */
@media (max-width: 768px) {
  .sidebar-header {
    padding: 1rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .file-title {
    font-size: 1.125rem;
  }

  .tab-content {
    padding: 1rem;
  }

  .comments-list {
    max-height: 250px;
  }
}

</style>