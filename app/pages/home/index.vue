<script setup lang="ts">
  import Hero from '@components/home/hero/index.vue';
  import { definePageMeta } from '#imports';

  definePageMeta({
    path: '/',
  });
</script>

<template>
  <div>
    <hero />
  </div>
</template>
