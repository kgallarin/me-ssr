<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { HoverDirections } from '@/types/animations.ts';

  withDefaults(
    defineProps<{
      currentHover?: HoverDirections;
    }>(),
    {
      currentHover: 'none',
    },
  );
</script>

<template>
  <!--  Header Split Text Pair end  -->
  <div
    class="pointer-events-none absolute inset-0 z-40 h-full w-full overflow-hidden"
  >
    <!-- Perceptive -->
    <motion.div
      class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat md:bg-contain"
      :style="{ backgroundImage: 'url(/images/me/kg_art_2.webp)' }"
      :animate="{
        clipPath:
          currentHover === 'right'
            ? 'inset(0 100% 0 0)'
            : currentHover === 'left'
              ? 'inset(0 0% 0 0)'
              : 'inset(0 50% 0 0)',
      }"
      :transition="{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }"
    />

    <!-- Coding -->
    <motion.div
      class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat md:bg-contain"
      :style="{ backgroundImage: 'url(/images/me/kg_art_1.webp)' }"
      :animate="{
        clipPath:
          currentHover === 'left'
            ? 'inset(0 0 0 100%)'
            : currentHover === 'right'
              ? 'inset(0 0 0 0%)'
              : 'inset(0 0 0 50%)',
      }"
      :transition="{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }"
    />
  </div>
</template>
