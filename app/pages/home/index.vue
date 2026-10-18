<script setup lang="ts">
  import { ref } from 'vue';

  definePageMeta({
    path: '/',
  });

  import PairedText from '@components/motion/hero/PairedText.vue';
  import { GREEN_AND_YELLOW_SWOOSH, PAIRED_TEXT_DATA } from '~/assets/constants.ts';
  import type {
    HoverDirections,
    IPairedText,
    PairedTextData,
    StackedAnimatedBg,
  } from '@/types/animations.ts';
  import SplitPairHeaderTexts from '@app/partials/home/split-effect/SplitPairHeaderTexts.vue';
  import SplitSubjectBgImages from '~/partials/home/split-effect/SplitSubjectBgImages.vue';
  import StackedBg from '@components/motion/hero/StackedBg.vue';
  import { GRAY_AND_BLUE_SWOOSH } from '../../assets/constants';

  const isAnyHoveredLeft = ref(false);
  const isAnyHoveredRight = ref(false);

  const currentHover = ref<HoverDirections>('none');
  const currentImage = ref('/images/me/kg_art_3.webp');

  const { createTextPair, createStackedBackground } = useHeroAnimation();

  const handleHoverLeft = () => {
    currentHover.value = 'left';
    currentImage.value = '/images/me/kg_art_2.webp';
    isAnyHoveredLeft.value = true;
    isAnyHoveredRight.value = false;
  };

  const handleHoverRight = () => {
    currentHover.value = 'right';
    currentImage.value = '/images/me/kg_art_1.webp';
  };

  const handleHoverLeave = () => {
    currentHover.value = 'none';
    currentImage.value = '/images/me/kg_art_3.webp';
  };

  const hoverablePairedTexts = computed((): IPairedText[] =>
    PAIRED_TEXT_DATA.map((data: PairedTextData): IPairedText =>
      createTextPair(
        data,
        {
          left: handleHoverLeft,
          right: handleHoverRight,
          leave: handleHoverLeave,
        },
        {
          left: isAnyHoveredLeft.value,
          right: isAnyHoveredRight.value,
        },
      ),
    ),
  );

  const swooshBgPair1 = computed((): StackedAnimatedBg => ({
    stack: GRAY_AND_BLUE_SWOOSH.stack.map((item, index) =>
      createStackedBackground(
        item,
        {
          opacity: currentHover.value === 'right' ? 1 : 0,
          x: currentHover.value === 'right' ? 0 : 10,
        },
        {
          duration: 0.6,
          delay: index === 0 ? 0.2 : 0, // index 0 animates second, index 1 animates first
          ease: 'easeOut',
        },
      ),
    ),
  }));

  const swooshBgPair2 = computed((): StackedAnimatedBg => ({
    stack: GREEN_AND_YELLOW_SWOOSH.stack.map((item, index) =>
      createStackedBackground(
        item,
        {
          opacity: currentHover.value === 'left' ? 1 : 0,
          x: currentHover.value === 'left' ? 0 : 10,
        },
        {
          duration: 0.6,
          delay: index === 0 ? 0.2 : 0,
          ease: 'easeOut',
        },
      ),
    ),
  }));
</script>

<template>
  <div
    class="hero-main bg-red border-secondary font-acumin relative flex justify-between overflow-hidden border-b"
  >
    <div class="pointer-events-none absolute inset-0 z-0">
      <!-- 2 Pair Swoosh: Background Layers for Split Effect -->
      <stacked-bg :stacked-bg="swooshBgPair1" />
      <stacked-bg :stacked-bg="swooshBgPair2" />
    </div>

    <!-- Main Header Text + Sub-texts for Split Effect -->
    <split-pair-header-texts :hover-direction="currentHover" />

    <!-- Subject BG Images for Split Effect -->
    <split-subject-bg-images :current-hover="currentHover" />

    <!--  Paired Skills Texts Hoverable: left/right  -->
    <div
      class="xs:-mt-2 xs:w-[420px] relative z-30 mx-auto flex flex-col font-light sm:mt-44 sm:w-[500px] md:mt-56 md:w-[700px] lg:mt-auto lg:mb-12"
    >
      <template v-for="pairedText in hoverablePairedTexts" :key="pairedText.id">
        <paired-text
          :paired-texts-props="pairedText"
          @text-hover-left="pairedText.hover.left"
          @text-hover-right="pairedText.hover.right"
          @text-hover-leave="pairedText.hover.leave"
        />
      </template>
    </div>
  </div>
</template>
