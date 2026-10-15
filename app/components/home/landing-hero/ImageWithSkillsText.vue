<script setup lang="ts">
  import { ref } from 'vue';

  // import kgArt1 from '@images/me/kg_art_1.webp';
  // import kgArt2 from '@images/me/kg_art_2.webp';
  // import kgArt3 from '@images/me/kg_art_3.webp';
  import { motion } from 'motion-v';

  import HeroAnimatedTexts from '@components/Partials/Home/LandingHero/HeroAnimatedTexts/index.vue';

  const currentHover = ref<'none' | 'left' | 'right'>('none');
  const currentImage = ref('images/me/kg_art_3.webp');

  const handleHoverLeft = () => {
    currentHover.value = 'left';
    currentImage.value = '/images/me/kg_art_3.webp';
    emit('hover-left');
  };

  const handleHoverRight = () => {
    currentHover.value = 'right';
    currentImage.value = '/images/me/kg_art_1.webp';
    emit('hover-right');
  };

  const handleHoverLeave = () => {
    currentHover.value = 'none';
    currentImage.value = '/images/me/kg_art_3.webp';
    emit('hover-leave');
  };

  const emit = defineEmits(['hover-left', 'hover-right', 'hover-leave']);
</script>

<template>
  <div
    class="align-center relative flex h-[450px] w-full flex-col justify-center overflow-hidden text-black md:h-auto lg:h-[800px]"
  >
    <!-- Background Images for Split Effect -->
    <div
      class="pointer-events-none absolute inset-0 z-40 h-full w-full overflow-hidden"
    >
      <!-- Perceptive -->
      <motion.div
        class="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat md:bg-contain"
        :style="{ backgroundImage: `url(images/me/kg_art_1.webp})` }"
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
        :style="{ backgroundImage: `url(images/me/kg_art_1.webp)` }"
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

    <hero-animated-texts
      @hover-left="handleHoverLeft"
      @hover-right="handleHoverRight"
      @hover-leave="handleHoverLeave"
    />

    <div
      class="xs:-mt-2 xs:w-[420px] relative z-30 mx-auto flex flex-col font-light sm:mt-44 sm:w-[500px] md:mt-56 md:w-[700px] lg:mt-auto lg:mb-12"
    >
      [ {
          texContenttLeft: 'Mockup Tools',
          textRight: 'S/CSS',
          classes: {
            left: 'mx-auto',
            right: 'mx-auto',
          },
          animatePx: {
            left: 70,
            right: 70,
          },
          hover: {
            left:
          }
        }
      ]
      <hero-image-text-shard
        class="2xs:ml-10 2xs:w-[230px] 2xs:text-base xs:ml-16 xs:w-[280px] text-base whitespace-nowrap sm:mx-auto sm:w-[240px] md:w-auto md:text-xl lg:w-[400px] lg:text-2xl"
        text-left="Mockup Tools"
        text-right="S/CSS"
        text-left-classes="mx-auto"
        text-right-classes="mx-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(140, 90, 70)"
        :animate-right-in-pixels="appStore.queryBreakpoints(50, 30, 20)"
        :is-any-hovered-left="hand"
        :is-any-hovered-right="isAnyHoveredRight"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
      />

      <hero-image-text-shard
        class="2xs:ml-10 2xs:w-[230px] 2xs:text-base xs:ml-16 xs:w-[280px] text-base whitespace-nowrap sm:mx-auto sm:w-[240px] md:w-auto md:text-xl lg:w-[400px] lg:text-2xl"
        text-left="Mockup Tools"
        text-right="S/CSS"
        text-left-classes="mx-auto"
        text-right-classes="mx-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(140, 90, 70)"
        :animate-right-in-pixels="appStore.queryBreakpoints(50, 30, 20)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
      />

      <hero-image-text-shard
        class="2xs:mb-12 2xs:text-base xs:mb-12 font-light whitespace-nowrap sm:mb-0 sm:-ml-16 md:-ml-8 md:text-xl lg:-ml-10 lg:text-4xl"
        text-left="Photoshop"
        text-right="TS/JavaScript"
        :animate-left-in-pixels="appStore.queryBreakpoints(140, 80, 90)"
        :animate-right-in-pixels="appStore.queryBreakpoints(120, 80, 50)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
        darken
      />

      <hero-image-text-shard
        class="2xs:text-base whitespace-nowrap sm:-ml-8 md:-ml-5 md:text-xl lg:-ml-20 lg:text-3xl"
        text-left="User Experience"
        text-right="State Management"
        :animate-left-in-pixels="appStore.queryBreakpoints(160, 130, 80)"
        :animate-right-in-pixels="appStore.queryBreakpoints(180, 120, 60)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
      />

      <hero-image-text-shard
        class="2xs:text-base xs:ml-16 xs:w-[290px] whitespace-nowrap sm:-ml-24 sm:w-[660px] md:mx-auto md:-ml-10 md:w-[768px] md:text-lg lg:-ml-36 lg:w-[900px] lg:text-5xl"
        text-left="Animation"
        text-right="Web/Mobile"
        text-left-classes="mx-auto"
        text-right-classes="mx-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(220, 90, 20)"
        :animate-right-in-pixels="appStore.queryBreakpoints(280, 80, 20)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
        darken
      />

      <hero-image-text-shard
        class="xs:-ml-18 2xs:text-base xs:w-[380px] whitespace-nowrap sm:-ml-20 md:mx-auto md:-ml-10 md:w-[658px] md:text-lg lg:-ml-56 lg:w-[980px] lg:text-3xl"
        text-left="Communication"
        text-right="Structure,Testing"
        text-left-classes="mx-auto"
        text-right-classes="ml-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(220, 110, 50)"
        :animate-right-in-pixels="appStore.queryBreakpoints(240, 110, 80)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
      />

      <hero-image-text-shard
        class="2xs:text-base whitespace-nowrap sm:-ml-28 md:mx-auto md:-ml-20 md:w-[730px] md:text-lg lg:-ml-72 lg:w-[1080px] lg:text-4xl"
        text-left="Detail Oriented"
        text-right="Forms, GraphQL"
        text-left-classes="mx-auto"
        text-right-classes="ml-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(240, 100, 80)"
        :animate-right-in-pixels="appStore.queryBreakpoints(280, 100, 60)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
        darken
      />

      <hero-image-text-shard
        class="2xs:text-base whitespace-nowrap sm:-ml-36 sm:w-[680px] md:mx-auto md:-ml-28 md:w-[768px] md:text-lg lg:-ml-96 lg:w-[1250px] lg:text-4xl"
        text-left="Responsive"
        text-right="Laravel/PHP"
        text-left-classes="mx-auto"
        text-right-classes="ml-auto"
        :animate-left-in-pixels="appStore.queryBreakpoints(180, 100, 120)"
        :animate-right-in-pixels="appStore.queryBreakpoints(170, 80, 60)"
        @text-hover-left="handleHoverLeft"
        @text-hover-right="handleHoverRight"
        @text-hover-leave="handleHoverLeave"
        :is-any-hovered-left="isAnyHoveredLeft"
        :is-any-hovered-right="isAnyHoveredRight"
      />
    </div>
  </div>
</template>
