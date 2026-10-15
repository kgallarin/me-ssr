<script setup lang="ts">
  import type { NullableSwooshLayerProps } from '@/types/animations.ts';
  import { motion } from 'motion-v';
  import { computed } from 'vue';

  const props = defineProps<{
    swoosh: NullableSwooshLayerProps;
  }>();

  const reactiveProps = computed((): NullableSwooshLayerProps => props.swoosh);
</script>

<template>
  <motion.div
    :class="reactiveProps?.bg?.classes"
    :animate="reactiveProps?.animation ?? {}"
    :transition="reactiveProps?.transition ?? {}"
    :style="{ backgroundImage: `url(${reactiveProps?.bg?.imagePath})` }"
  />
</template>
