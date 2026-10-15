<script setup lang="ts">
  import { ConfigProvider } from 'reka-ui';

  // useSeoMeta({
  //   titleTemplate: '%s | KGallarin',
  //   ogType: 'website',
  //   ogSiteName: 'Kevin Gallarin',
  //   robots: 'index, follow',
  // });
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
