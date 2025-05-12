<template>
  <img :src="src" alt="Image" style="max-width: 100%;" />
</template>
<script setup>
defineProps({ src: String })
</script>
