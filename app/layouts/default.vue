<script setup lang="ts">
  import Header from '@components/layout/Header.vue';
</script>

<template>
  <div data-testid="default-layout">
    <Header />
    <slot />
  </div>
</template>
