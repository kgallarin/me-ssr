<script setup lang="ts">
  withDefaults(
    defineProps<{
      sandwich?: boolean;
    }>(),
    {
      sandwich: false,
    },
  );
</script>

<template>
  <div
    class="lg:max-w-5xl"
    :class="[
      { 'shadow-bottom bg-gray-lighter': sandwich },
      'mx-auto px-4 xl:max-w-7xl xl:px-0',
    ]"
  >
    <slot />
  </div>
</template>
