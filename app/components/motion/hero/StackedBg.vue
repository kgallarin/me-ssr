<script setup lang="ts">
  import AnimatedBackgroundImage from '@components/motion/hero/AnimatedBackgroundImage.vue';
  import type { StackedAnimatedBg } from '@/types/animations.ts';

  const props = withDefaults(
    defineProps<{
      stackedBg: StackedAnimatedBg;
    }>(),
    {},
  );

  const computedStackedBgArr = computed(() => props.stackedBg);
</script>

<template>
  <!-- last-->
  <div
    class="pointer-events-none absolute inset-0 z-40 h-full w-full overflow-hidden"
  >
    <animated-background-image
      v-for="animatedBg in computedStackedBgArr.stack"
      :key="animatedBg.id"
      :config="{
        id: animatedBg.id,
        bg: {
          classes: animatedBg.bg.classes,
          imagePath: animatedBg.bg.imagePath,
        },
        animation: animatedBg.animation,
        transition: animatedBg.transition,
      }"
    />
  </div>
</template>
