<template>
  <pre>{{ content }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({ src: String })
const content = ref('')

onMounted(async () => {
  const res = await fetch(props.src)
  content.value = await res.text()
})
</script>
