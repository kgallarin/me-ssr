<script setup lang="ts">
  import AnimatedHeroSection from '@partials/home/animated-hero-section/index.vue';
  definePageMeta({
    path: '/',
    layout: 'default',
  });
</script>

<template>
  <div
    class="bg-gray-lighter flex flex-1 flex-col bg-[url('/images/backgrounds/webp/leaves-4.webp')] bg-blend-multiply"
  >
    <animated-hero-section />
  </div>
</template>
