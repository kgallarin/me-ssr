<script setup lang="ts">
  import BaseToast from '@components/base/BaseToast.vue';
  import AnimatedHeroSection from '@partials/home/animated-hero-section/index.vue';
  import ProjectSlider from '@partials/home/project-slider/index.vue';
  import { useAppStore } from '@store/modules/app.ts';
  import { useThemeStore } from '@store/modules/theme.ts';
  import { useProjects } from '~/composables/projects/useProjects.ts';
  import { useSeoPage } from '~/composables/seo/useSeoPage.ts';

  definePageMeta({
    path: '/',
    layout: 'default',
  });

  useSeoPage({
    title: 'home',
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

  const { $api } = useNuxtApp();

  async function testRetryFlow() {
    try {
      await $api('/_test/flaky', {
        query: { mode: '422' },
      });
      // console.log('Success response:', res);
    } catch {
      // console.error('Normalized error:', err);
    }
  }
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
      <!-- Temporary test trigger -->
      <button
        type="button"
        class="fixed bottom-4 right-4 z-50 rounded bg-black px-3 py-2 text-xs text-white"
        @click="testRetryFlow"
      >
        Test Retry Flow
      </button>
      <project-slider :projects="projects" />
    </div>
  </div>
</template>
