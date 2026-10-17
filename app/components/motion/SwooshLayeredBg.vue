<script setup lang="ts">
  import { type TargetAndTransition, type ValueAnimationTransition } from 'motion-v';
  import AnimatedBackgroundImage from '@components/motion/AnimatedBackgroundImage.vue';

  const props = withDefaults(
    defineProps<{
      containerClasses?: string;

      imgUrl1: string;
      firstBgClasses?: string;
      isHoveredRight: boolean;
      isHoveredLeft: boolean;
      animatePropBg1: TargetAndTransition;
      transitionPropBg1: ValueAnimationTransition;

      imgUrl2: string;
      secondBgClasses?: string;
      animatePropBg2: TargetAndTransition;
      transitionPropBg2: ValueAnimationTransition;
    }>(),
    {
      containerClasses: '',
      firstBgClasses: '',
      secondBgClasses: '',
    },
  );

  const {
    containerClasses,

    imgUrl1,
    firstBgClasses,
    animatePropBg1,
    transitionPropBg1,

    imgUrl2,
    secondBgClasses,
    animatePropBg2,
    transitionPropBg2,
  } = props;
</script>

<template>
  <div :class="containerClasses">
    <!-- last-->
    <animated-background-image
      :swoosh="{
        bg: {
          classes: firstBgClasses,
          imagePath: imgUrl1,
        },
        animation: animatePropBg1,
        transition: transitionPropBg1,
      }"
    />

    <!--  first layer-->
    <animated-background-image
      :swoosh="{
        bg: {
          classes: secondBgClasses,
          imagePath: imgUrl2,
        },
        animation: animatePropBg2,
        transition: transitionPropBg2,
      }"
    />
  </div>
</template>
