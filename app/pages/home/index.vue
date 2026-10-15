<script setup lang="ts">
  import LandingHero from '@components/home/landing-hero/index.vue';
  import { definePageMeta } from '#imports';

  definePageMeta({
    path: '/',
  });
</script>

<template>
  <div>
    home page.
    <landing-hero />
  </div>
</template>
