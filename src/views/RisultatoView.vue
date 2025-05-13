<template>
  <NavBar></NavBar>
  <div class="page">
    <div class="content-container">
      <div class="page-header">
        <h1 class="main-title">Risultati della ricerca</h1>
        <p v-if="fileStore.risultati.length > 0" class="result-count">{{ fileStore.risultati.length }} appunti trovati</p>
      </div>

      <div v-if="fileStore.risultati.length > 0" class="results-grid">
        <div v-for="(c, index) in fileStore.risultati" :key="index" class="note-card">
          <div @click="setCurrentFile(c)" class="card-link">
            <div class="card-content">
              <div class="preview-area">
                <img
                    v-if="isImage(c.link)"
                    :src="c.link"
                    :alt="c.title"
                    class="note-preview"
                />
                <img
                    v-else
                    :src="c.preview"
                    alt="Anteprima"
                    class="note-preview"
                />
                <div class="overlay">
                  <span class="view-text">Visualizza</span>
                </div>
              </div>

              <div class="note-info">
                <h2 class="note-title">{{ c.title }}</h2>
                <div class="note-meta">
                  <div class="stats">
                    <span class="views">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {{c.views || 0}}
                    </span>
                    <span class="downloads">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
                        <path d="M12 17V3" />
                        <path d="m6 11 6 6 6-6" />
                        <path d="M19 21H5" />
                      </svg>
                      {{c.downloads || 0}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="action-bar">
            <button class="action-button like-btn" :class="{ active: isLiked(index) }" @click.prevent="toggleLike(c, index)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>              <span>{{ likeStatsList[index]?.likes || c.likes }}</span>
            </button>

            <button class="action-button dislike-btn" :class="{ active: isDisliked(index) }" @click.prevent="toggleDislike(c, index)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
                <path d="M17 14V2" />
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
              </svg>              <span>{{ likeStatsList[index]?.dislikes || c.dislikes }}</span>
            </button>

            <button @click="download(c.link, c.title, c)" class="action-button save-btn" >
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="empty-icon">
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M3.6 9h16.8a1 1 0 0 1 .9 1.45l-8.4 14.14a1 1 0 0 1-1.8 0L2.7 10.45A1 1 0 0 1 3.6 9z" />
        </svg>
        <p>Nessun appunto trovato. Riprova con una ricerca diversa.</p>
      </div>
    </div>
  </div>
  <foo class="footer"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFileStore } from '@/stores/fileStore.js'
import { useshareinput } from "@/stores/shareInput.js"
import NavBar from '@/components/NavBar.vue'
import router from "@/routers/index.js"
import foo from "../components/footer.vue";

const fileStore = useFileStore();
const shareInput = useshareinput();
let risultati = ref([]);
const searchTerm = shareInput.testo;
const likedItems = ref({});
const dislikedItems = ref({});
const likeStatsList = ref([]);
const userVotes = ref([]);


const setCurrentFile = (file) => {
  fileStore.setCurrentFile(file);
  fileStore.addView(file);
  router.push('/visualizza');
};

const isLiked = (i) => userVotes.value[i] === 'like';
const isDisliked = (i) => userVotes.value[i] === 'dislike';


const isImage = (url) => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase().split('?')[0];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => lowerUrl.endsWith(ext));
};

const fetchResults = async () => {
  await fileStore.searchFile(searchTerm);
};

const toggleLike = async (file, i) => {
  const fileId = file.id;
  await fileStore.likeFile(fileId);
  likeStatsList.value[i] = await fileStore.getLikeStats(fileId);
  file.likes = likeStatsList.value[i].likes;
  file.dislikes = likeStatsList.value[i].dislikes;
  userVotes.value[i] = 'like';
};

const toggleDislike = async (file, i) => {
  const fileId = file.id;
  await fileStore.dislikeFile(fileId);
  likeStatsList.value[i] = await fileStore.getLikeStats(fileId);
  file.dislikes = likeStatsList.value[i].dislikes;
  file.likes = likeStatsList.value[i].likes;
  userVotes.value[i] = 'dislike';
};

const download =  (url, name, file) => {
  fileStore.addDownload(file);
  console.log(file);
  fileStore.downloadfile(url, name);
}

onMounted(fetchResults);
onMounted(async () => {
  for (let i = 0; i < fileStore.risultati.length; i++) {
    likeStatsList.value[i] = await fileStore.getLikeStats(fileStore.risultati[i].id);
    userVotes.value[i] = await fileStore.getUserVote(fileStore.risultati[i].id);
  }
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  background-color: #f7f9fc;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 50px;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header styles */
.page-header {
  padding: 20px 0 40px;
  text-align: center;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.result-count {
  font-size: 16px;
  color: #718096;
}

/* Grid layout */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;

}

/* Note card */
.note-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 360px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(0, 23, 156);
}

.note-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 2px 4px rgb(0, 204, 255);
}

.card-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: block;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Preview area */
.preview-area {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #edf2f7;
  margin: 10px;
}

.subject-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(49, 130, 206, 0.9);
  color: white;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
  transition: all 0.2s ease;
}

.note-card:hover .subject-tag {
  background: rgba(49, 130, 206, 1);
}

.note-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.note-card:hover .note-preview {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 32, 44, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.note-card:hover .overlay {
  opacity: 1;
}

.view-text {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 500;
  font-size: 14px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.note-card:hover .view-text {
  transform: translateY(0);
}

/* Note info */
.note-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.note-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

.note-meta {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #718096;
}

.views, .downloads {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

/* Action buttons */
.action-bar {
  display: flex;
  padding: 8px;
  border-top: 1px solid #edf2f7;
  background: #fafafa;
  align-items: center;
  justify-items: center;

}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  border-radius: 6px;
  transition: all 0.2s ease;

}

.action-button:hover {
  background: #f1f5f9;
}

.action-button.active, .like-btn.active {
  color: #3182ce;
}

.dislike-btn.active {
  color: #e53e3e;
}

.like-btn:hover {
  color: #3182ce;
}

.dislike-btn:hover {
  color: #e53e3e;
}
.save-btn:hover {
  color: #fbff00;
}

/* Empty state */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  text-align: center;
  color: #718096;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 24px;
  color: #cbd5e0;
  stroke-width: 1.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    padding: 0 16px;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .main-title {
    font-size: 24px;
  }

  .preview-area {
    height: 180px;
  }

  .note-card {
    height: 320px;
  }
}

@media (max-width: 480px) {
  .results-grid {
    grid-template-columns: 1fr;
  }

  .note-card {
    height: 300px;
  }

  .action-button span {
    display: none;
  }

  .action-button .icon {
    width: 20px;
    height: 20px;
  }
}
</style>