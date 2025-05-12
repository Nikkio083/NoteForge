<template>
  <video :src="src" controls style="max-width: 100%;" />
</template>
<script setup>
defineProps({ src: String })
</script>
