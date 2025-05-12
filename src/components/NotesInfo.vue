<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: String,
  author: String,
  school: String,
  date: String,
  content: String,
  tags: Array,
  sizeInPages: Number,
  course: String,
  likes: Number,
  followers: Number,
  uploads: Number,
});

const emit = defineEmits(['close-sidebar']);
</script>

<template>
  <aside class="sidebar">
    <button class="close-btn" @click="emit('close-sidebar')">&times;</button>
    <div class="header">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="details">
      <p><strong>Autore:</strong> {{ author }}</p>
      <p><strong>Scuola:</strong> {{ school }}</p>
      <p><strong>Data:</strong> {{ date }}</p>
      <p><strong>Corso:</strong> {{ course }}</p>
      <p><strong>Pagine:</strong> {{ sizeInPages }}</p>
    </div>
    <div class="stats">
      <div class="stat-item"><strong>Likes:</strong> {{ likes }} ❤️</div>
      <div class="stat-item"><strong>Follower:</strong> {{ followers }}</div>
      <div class="stat-item"><strong>Upload:</strong> {{ uploads }}</div>
    </div>
    <div class="tags">
      <strong>Tags:</strong>
      <div class="tags-container">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <button class="action-btn">Segui Appunto</button>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 320px;
  height: 100vh;
  background: #fff;
  padding: 25px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  align-self: flex-end;
  color: #888;
}

.close-btn:hover {
  color: #333;
}

.header .title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.details p, .stats .stat-item, .tags {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-item {
  padding: 5px 0;
}

.tags {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #e0f7fa;
  color: #006064;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
}

.action-btn {
  background: #00796b;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: #00695c;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
  }
}
</style>
