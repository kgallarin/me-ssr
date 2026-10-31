<script setup lang="ts">
  import type { ScrollRevealDirections } from '@/types/ScrollReveal.ts';
  import { motion } from 'motion-v';

  const props = withDefaults(
    defineProps<{
      delay?: number;
      duration?: number;
      direction?: ScrollRevealDirections;
      distance?: number;
      animateOnce?: boolean;
      animateOnlyScrollDown?: boolean;
      noAnimation?: boolean;
    }>(),
    {
      delay: 0,
      duration: 0.6,
      direction: 'up',
      distance: 50,
      animateOnce: false,
      animateOnlyScrollDown: false,
      noAnimation: false,
    },
  );

  const { target, isVisible, skipAnimation, getInitialX, getInitialY } =
    useScrollReveal({
      animateOnce: props.animateOnce,
      animateOnlyScrollDown: props.animateOnlyScrollDown,
    });
</script>

<template>
  <div ref="target">
    <motion.div
      :initial="{
        opacity: noAnimation ? 1 : 0,
        x: noAnimation ? 0 : getInitialX(direction, distance),
        y: noAnimation ? 0 : getInitialY(direction, distance),
      }"
      :animate="{
        opacity: noAnimation || isVisible ? 1 : 0,
        x: noAnimation || isVisible ? 0 : getInitialX(direction, distance),
        y: noAnimation || isVisible ? 0 : getInitialY(direction, distance),
      }"
      :transition="{
        duration: noAnimation || skipAnimation ? 0 : duration,
        delay: noAnimation || skipAnimation ? 0 : delay,
        ease: 'easeOut',
      }"
    >
      <slot />
    </motion.div>
  </div>
</template>
