<template>
  <div>
    <component :is="viewerComponent" :src="src" v-if="viewerComponent" />
    <p v-else>Tipo di file non supportato: {{ extension }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})

const extension = computed(() => {
  const match = props.src.match(/\.(\w+)$/)
  return match ? match[1].toLowerCase() : ''
})

const viewerComponent = computed(() => {
  switch (extension.value) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return 'ImageViewer'
    case 'mp4':
    case 'webm':
      return 'VideoViewer'
    case 'mp3':
    case 'wav':
      return 'AudioViewer'
    case 'pdf':
      return 'PDFViewer'
    case 'txt':
    case 'md':
      return 'TextViewer'
    default:
      return null
  }
})
</script>

<script>
import ImageViewer from './ImageViewer.vue'
import VideoViewer from './VideoViewer.vue'
import AudioViewer from './AudioViewer.vue'
import PDFViewer from './PDFViewer.vue'
import TextViewer from './TextViewer.vue'

export default {
  name: 'FileViewer',
  components: {
    ImageViewer,
    VideoViewer,
    AudioViewer,
    PDFViewer,
    TextViewer
  }
}
</script>
