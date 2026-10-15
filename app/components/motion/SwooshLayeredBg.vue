<script setup lang="ts">
  import { motion, type TargetAndTransition } from 'motion-v';
  import LayeredBackgroundImage from '@components/motion/LayeredBackgroundImage.vue';

  withDefaults(
    defineProps<{
      containerClasses?: string;
      firstBgClasses?: string;
      secondBgClasses?: string;
      isHoveredRight: boolean;
      isHoveredLeft: boolean;
      imgUrl: string;
      animatePropBg1: TargetAndTransition;
      animatePropBg2: TargetAndTransition;
    }>(),
    {
      containerClasses: '',
      firstBgClasses: '',
      secondBgClasses: '',
    },
  );
</script>

<template>
  <div :class="containerClasses">
    <!-- last-->
    <layered-background-image
      :swoosh="{
        bg: {
          classes: firstBgClasses,
          imagePath: imgUrl,
        },
        animation: animatePropBg1,
        transition: {
          opacity: isHoveredRight ? 1 : 0,
          x: isHoveredRight ? 0 : 10,
        },
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
