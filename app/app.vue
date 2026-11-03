<script setup lang="ts">
  import { useThemeStore } from '@store/modules/theme.ts';
  import { ConfigProvider } from 'reka-ui';
  import { STORAGE_KEYS, THEME } from '~/assets/constants';

  // useSeoMeta({
  //   titleTemplate: '%s | KGallarin',
  //   ogType: 'website',
  //   ogSiteName: 'Kevin Gallarin',
  //   robots: 'index, follow',
  // });

  const themeStore = useThemeStore();
  onMounted(() => {
    themeStore.initializeTheme();
  });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kevin Gallarin | Frontend, Fullstack capable',
          url: 'https://kgallarin.com',
          sameAs: [
            'https://github.com/kgallarin',
            'https://www.linkedin.com/in/kgallarin',
          ],
        }),
      },
    ],
  });

  useHead({
    script: [
      {
        innerHTML: `(function() {
          const theme = localStorage.getItem(${JSON.stringify(STORAGE_KEYS.THEME)}) || ${THEME.LIGHT};
          document.documentElement.setAttribute('data-theme', theme);
        })()`,
      },
    ],
  });
</script>

<template>
  <div data-testid="app-root" class="h-full">
    <ConfigProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
  </div>
</template>
