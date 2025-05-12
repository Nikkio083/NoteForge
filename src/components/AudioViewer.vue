<template>
  <audio :src="src" controls />
</template>
<script setup>
defineProps({ src: String })
</script>
