<script setup lang="ts">
  import type { AppTheme } from '@/types/App.ts';
  import { motion } from 'motion-v';
  import { THEME } from '~/assets/constants';

  const props = withDefaults(
    defineProps<{
      isOpen?: boolean;
      theme?: AppTheme;
    }>(),
    {
      isOpen: false,
      theme: THEME.LIGHT,
    },
  );

  const emit = defineEmits(['close', 'emit', 'animation-complete']);

  const {
    targetRef,
    dimensions,
    containerVariants,
    itemVariants,
    backgroundVariants,
    handleAnimationComplete,
  } = useStaggeredVerticalNav({
    isOpen: () => props.isOpen,
    theme: () => props.theme,
    onAnimationComplete: () => emit('animation-complete'),
  });
</script>

<template>
  <motion.div
    ref="targetRef"
    initial="closed"
    :animate="isOpen ? 'open' : 'closed'"
    :custom="dimensions.height"
    class="relative h-full w-full"
  >
    <!-- Tailwind/CSS handle the background, leaving Motion to purely execute clipPath -->
    <motion.div
      class="bg-base-container bg-variant"
      :animate="isOpen ? 'open' : 'closed'"
      :custom="dimensions.height"
      :variants="backgroundVariants"
      @animation-complete="handleAnimationComplete"
    />

    <slot name="stagger-nav-slot" :variants="{ containerVariants, itemVariants }" />
  </motion.div>
</template>

<style scoped>
  /* apply default bg color */
  .bg-variant {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
</style>
