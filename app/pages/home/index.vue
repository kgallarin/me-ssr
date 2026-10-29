<script setup lang="ts">
  import AnimatedHeroSection from '@partials/home/animated-hero-section/index.vue';
  import ProjectSlider from '@partials/home/project-slider/index.vue';
  import { useProjects } from '~/composables/projects/useProjects.ts';

  definePageMeta({
    path: '/',
    layout: 'default',
  });

  const { projects } = useProjects();
</script>

<template>
  <div
    class="bg-gray-lighter flex flex-1 flex-col bg-[url('/images/backgrounds/webp/leaves-4.webp')] bg-blend-multiply"
  >
    <animated-hero-section />

    <project-slider :projects="projects" theme="light" />
  </div>
</template>
