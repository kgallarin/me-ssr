<script setup lang="ts">
  import { computed } from 'vue';

  import type { NullableAnimatedBg } from '@/types/SplitHeroAnimations.ts';
  import { motion } from 'motion-v';

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
