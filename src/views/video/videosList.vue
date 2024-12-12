<template>
    <iframe class="w-full h-full" :src="embedUrl" frameborder="0" :allowfullscreen="true"></iframe>
  </template>
  
<script setup lang="ts">
const props = defineProps({
    videoId: String,
});

const embedUrl = `https://www.youtube.com/embed/${props.videoId}`;

</script>
