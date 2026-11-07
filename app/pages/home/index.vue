<script setup lang="ts">
  import BaseToast from '@components/base/BaseToast.vue';
  import AnimatedHeroSection from '@partials/home/animated-hero-section/index.vue';
  import ProjectSlider from '@partials/home/project-slider/index.vue';
  import { useAppStore } from '@store/modules/app.ts';
  import { useThemeStore } from '@store/modules/theme.ts';
  import { useProjects } from '~/composables/projects/useProjects.ts';

  definePageMeta({
    path: '/',
    layout: 'default',
  });

  const showToast = ref(false);

  const appStore = useAppStore();
  const isDesktop = computed(() => appStore.isDesktop);

  const themeStore = useThemeStore();
  const theme = computed(() => themeStore.themeState);

  const { projects } = useProjects();
  setTimeout(() => {
    showToast.value = true;
  }, 1000);
</script>

<template>
  <div
    class="bg-gray-lighter flex flex-1 flex-col bg-[url('/images/backgrounds/webp/leaves-4.webp')] bg-blend-multiply"
  >
    <!--	slotted toast -->
    <base-toast
      :show="showToast"
      :message="`${isDesktop ? 'Hover' : 'Tap'} the texts behind me, to explore skills`"
      position="top"
      :toast-offset="0"
      :index="1"
      :show-delay="700"
      :theme="theme"
      @close="showToast = false"
    />

    <animated-hero-section />

    <div>
      <project-slider :projects="projects" />
    </div>
  </div>
</template>
