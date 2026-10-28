<script setup lang="ts">
  import { ConfigProvider } from 'reka-ui';

  // useSeoMeta({
  //   titleTemplate: '%s | KGallarin',
  //   ogType: 'website',
  //   ogSiteName: 'Kevin Gallarin',
  //   robots: 'index, follow',
  // });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': 'Kevin Gallarin | Frontend, Fullstack capable',
          'url': 'https://kgallarin.com',
          'sameAs': [
            'https://github.com/kgallarin',
            'https://www.linkedin.com/in/kgallarin',
          ],
        }),
      },
    ],
  })
</script>

<template>
  <div data-testid="app-root" class="theme-light h-full">
    <ConfigProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
  </div>
</template>
