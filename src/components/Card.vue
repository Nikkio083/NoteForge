<template>
  <div class="card">
    <h1 class="title">{{title}}</h1>
    <h2 class="subtitle">{{ tags}}</h2>
    <img :src="imgSrc" alt="Image" class="image" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.card {
  background-color: #e0f7fa; /* azzurro chiaro */
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.title {
  font-size: 24px;
  color: #000000; /* testo nero */
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: #333333; /* grigio scuro */
}
</style>
