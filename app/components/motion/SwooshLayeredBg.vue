<script setup lang="ts">
  import { motion, type TargetAndTransition } from 'motion-v';

  withDefaults(
    defineProps<{
      containerClasses?: string;
      firstBgClasses?: string;
      secondBgClasses?: string;
      isHoveredRight: boolean;
      isHoveredLeft: boolean;
      animatePropBg1?: TargetAndTransition;
      animatePropBg2?: TargetAndTransition;
    }>(),
    {
      containerClasses: '',
      firstBgClasses: '',
      secondBgClasses: '',
      animatePropBg1: () => ({}),
      animatePropBg2: () => ({}),
    },
  );
</script>

<template>
  <div class="">
    <!-- last-->
    <motion.div
      :class="firstBgClasses"
      :animate="animatePropBg1"
      :transition="{
        duration: 0.6,
        delay: 0.2, // animate second
        ease: 'easeOut',
      }"
    />

    <!--  first layer-->
    <motion.div
      :class="secondBgClasses"
      :animate="animatePropBg2"
      :transition="{
        duration: 0.6,
        delay: 0.2, // animate second
        ease: 'easeOut',
      }"
    />
  </div>
</template>
