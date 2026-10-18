<script setup lang="ts">
  import type { NullableAnimatedBg } from '@/types/animations.ts';
  import { motion } from 'motion-v';
  import { computed } from 'vue';

  const props = defineProps<{
    config: NullableAnimatedBg;
  }>();

  const computedProps = computed(() => props.config);
</script>

<template>
  <motion.div
    :class="computedProps.bg?.classes"
    :animate="computedProps.animation ?? {}"
    :transition="computedProps.transition ?? {}"
    :style="{ backgroundImage: `url(${computedProps.bg?.imagePath})` }"
  />
</template>
