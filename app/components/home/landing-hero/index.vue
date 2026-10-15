<script setup lang="ts">
  import SwooshLayeredBg from '@components/motion/SwooshLayeredBg.vue';
  import LeftAndRightTexts from '@components/home/landing-hero/LeftAndRightTexts.vue';
  import ImageWithSkillsText from '@components/home/landing-hero/ImageWithSkillsText.vue';

  withDefaults(
    defineProps<{
      isHoveredRight?: boolean;
      isHoveredLeft?: boolean;
    }>(),
    {
      isHoveredRight: false,
      isHoveredLeft: false,
    },
  );

  const emit = defineEmits(['hover-right', 'hover-left', 'hover-leave', 'click']);
</script>

<template>
  <div
    class="hero-main border-secondary font-acumin relative flex justify-between overflow-hidden border-b bg-red-900"
    @click="emit('click')"
  >
    <!-- Background Layers -->
    <swoosh-layered-bg
      container-classes="pointer-events-none absolute inset-0 z-0"
      first-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_gray.webp')] bg-right bg-no-repeat"
      second-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_blue.webp')] bg-right bg-no-repeat"
      :is-hovered-right="isHoveredRight"
      :is-hovered-left="isHoveredLeft"
      img-url="/images/backgrounds/webp/swoosh_gray.webp"
      :animate-prop-bg1="{
        opacity: isHoveredRight ? 1 : 0,
        x: isHoveredRight ? 0 : 10,
      }"
      :animate-prop-bg2="{
        opacity: isHoveredRight ? 1 : 0,
        x: isHoveredRight ? 0 : 10,
      }"
    />

    <swoosh-layered-bg
      container-classes="pointer-events-none absolute inset-0 z-0"
      first-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_green.webp')] bg-left bg-no-repeat"
      second-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_yellow.webp')] bg-left bg-no-repeat"
      :is-hovered-right="isHoveredRight"
      :is-hovered-left="isHoveredLeft"
      img-url="/images/backgrounds/webp/swoosh_yellow.webp"
      :animate-prop-bg1="{
        opacity: isHoveredLeft ? 1 : 0,
        x: isHoveredLeft ? 0 : 10,
      }"
      :animate-prop-bg2="{
        opacity: isHoveredLeft ? 1 : 0,
        x: isHoveredLeft ? 0 : 10,
      }"
    />

    <left-and-right-texts
      class="absolute z-0"
      :is-hovered-right="isHoveredRight"
      :is-hovered-left="isHoveredLeft"
    />

    <image-with-skills-text />
  </div>
</template>
