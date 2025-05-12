<template>
  <iframe :src="src" width="100%" height="600px" />
</template>
<script setup>
defineProps({ src: String })
</script>
