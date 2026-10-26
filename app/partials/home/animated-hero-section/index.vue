<script setup lang="ts">
  import { PAIRED_TEXT_DATA } from '~/assets/constants.ts';

  import PairedText from '@components/motion/hero/PairedText.vue';
  import SplitPairHeaderTexts from '@app/partials/home/split-effect/SplitPairHeaderTexts.vue';
  import SplitSubjectBgImages from '~/partials/home/split-effect/SplitSubjectBgImages.vue';
  import StackedBg from '@components/motion/hero/StackedBg.vue';
  import { useHeroAnimation } from '~/composables/home/useHeroAnimation.ts';

  const { hoverablePairedTexts, currentHover, swooshBgPair1, swooshBgPair2 } =
    useHeroAnimation();
</script>

<template>
  <div
    class="hero-main border-secondary font-acumin relative flex justify-between overflow-hidden border-b"
  >
    <div class="pointer-events-none absolute inset-0 z-0">
      <!-- 1/2 Pair Swoosh: Background Layers for Split Effect -->
      <stacked-bg :stacked-bg="swooshBgPair1" />
    </div>

    <div class="pointer-events-none absolute inset-0 z-0">
      <!-- 2/2 Pair Swoosh: Background Layers for Split Effect -->
      <stacked-bg :stacked-bg="swooshBgPair2" />
    </div>

    <!-- Main Header Text + Sub-texts for Split Effect -->
    <split-pair-header-texts
      left-header-text="perceptive"
      right-header-text="<coding />"
      :hover-direction="currentHover"
    />

    <!-- Subject BG(me) Images for Split Effect -->
    <div
      class="align-center relative z-10 flex h-[450px] w-full flex-col justify-center overflow-hidden text-black md:h-auto lg:h-[800px]"
    >
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
  </div>
</template>

<style lang="css">
  .text-shard div {
    line-height: 1.25;
  }
</style>
