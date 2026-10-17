<script setup lang="ts">
  import type { NullableSwooshLayerProps } from '@/types/animations.ts';
  import { motion } from 'motion-v';
  import { toRefs, computed } from 'vue';

  const props = defineProps<{
    swoosh: NullableSwooshLayerProps;
  }>();

  const nullSwoosh = computed(
    () =>
      props.swoosh ?? {
        bg: { classes: '', imagePath: '' },
        animation: {},
        transition: {},
      },
  );

  const { bg, animation, transition } = toRefs(nullSwoosh.value);
</script>

<template>
  <motion.div
    :class="bg?.classes"
    :animate="animation ?? {}"
    :transition="transition ?? {}"
    :style="{ backgroundImage: `url(${bg?.imagePath})` }"
  />
</template>
