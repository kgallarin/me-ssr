<script setup lang="ts">
  import { ref } from 'vue';

  definePageMeta({
    path: '/',
  });
  import PairedText from '@components/home/hero/PairedText.vue';
  import SplitEffect from '@components/home/hero/SplitEffect.vue';
  import type { HoverablePairedText } from '@/types/animations.ts';

  const isAnyHoveredLeft = ref(false);
  const isAnyHoveredRight = ref(false);

  const currentHover = ref<'none' | 'left' | 'right'>('none');
  const currentImage = ref('/images/me/kg_art_3.webp');

  const handleHoverLeft = () => {
    currentHover.value = 'left';
    currentImage.value = '/images/me/kg_art_2.webp';

    isAnyHoveredLeft.value = true;
    isAnyHoveredRight.value = false;

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

  const hoverablePairedTexts: HoverablePairedText[] = [
    {
      id: '1',
      textContent: {
        left: 'Mockup Tools',
        right: 'S/CSS',
      },
      classes: {
        container:
          '2xs:ml-10 2xs:w-[230px] 2xs:text-base xs:ml-16 xs:w-[280px] text-base whitespace-nowrap sm:mx-auto sm:w-[240px] md:w-auto md:text-xl lg:w-[400px] lg:text-2xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 70,
        right: 70,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
    },
    {
      id: '2',
      textContent: {
        left: 'Photoshop',
        right: 'TS/JavaScript',
      },
      classes: {
        container:
          '2xs:mb-12 2xs:text-base xs:mb-12 font-light whitespace-nowrap sm:mb-0 sm:-ml-16 md:-ml-8 md:text-xl lg:-ml-10 lg:text-4xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 90,
        right: 50,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
      darken: true,
    },
    {
      id: '3',
      textContent: {
        left: 'User Experience',
        right: 'State Management',
      },
      classes: {
        container:
          '2xs:text-base whitespace-nowrap sm:-ml-8 md:-ml-5 md:text-xl lg:-ml-20 lg:text-3xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 80,
        right: 60,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
    },
    {
      id: '4',
      textContent: {
        left: 'Animation',
        right: 'Web/Mobile',
      },
      classes: {
        container:
          '2xs:text-base xs:ml-16 xs:w-[290px] whitespace-nowrap sm:-ml-24 sm:w-[660px] md:mx-auto md:-ml-10 md:w-[768px] md:text-lg lg:-ml-36 lg:w-[900px] lg:text-5x',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 20,
        right: 20,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
      darken: true,
    },
    {
      id: '5',
      textContent: {
        left: 'Communication',
        right: 'Structure,Testing',
      },
      classes: {
        container:
          'xs:-ml-18 2xs:text-base xs:w-[380px] whitespace-nowrap sm:-ml-20 md:mx-auto md:-ml-10 md:w-[658px] md:text-lg lg:-ml-56 lg:w-[980px] lg:text-3xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 50,
        right: 80,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
    },
    {
      id: '6',
      textContent: {
        left: 'Detail Oriented',
        right: 'Forms, GraphQL',
      },
      classes: {
        container:
          '2xs:text-base whitespace-nowrap sm:-ml-28 md:mx-auto md:-ml-20 md:w-[730px] md:text-lg lg:-ml-72 lg:w-[1080px] lg:text-4xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 80,
        right: 60,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
      darken: true,
    },
    {
      id: '7',
      textContent: {
        left: 'Responsive',
        right: 'Laravel/PHP',
      },
      classes: {
        container:
          '2xs:text-base whitespace-nowrap sm:-ml-36 sm:w-[680px] md:mx-auto md:-ml-28 md:w-[768px] md:text-lg lg:-ml-96 lg:w-[1250px] lg:text-4xl',
        leftPair: 'mx-auto',
        rightPair: 'mx-auto',
      },
      animatePx: {
        left: 120,
        right: 60,
      },
      hover: {
        left: () => handleHoverLeft(),
        right: () => handleHoverRight(),
        leave: () => handleHoverLeave(),
      },
      hoveredAny: {
        left: isAnyHoveredLeft.value,
        right: isAnyHoveredRight.value,
      },
      darken: true,
    },
  ];
</script>

<template>
  <div
    class="align-center relative flex h-[450px] w-full flex-col justify-center overflow-hidden text-black md:h-auto lg:h-[800px]"
  >
    <!-- Background Images for Split Effect -->
    <split-effect :current-hover="currentHover" />

    <div
      class="xs:-mt-2 xs:w-[420px] relative z-30 mx-auto flex flex-col font-light sm:mt-44 sm:w-[500px] md:mt-56 md:w-[700px] lg:mt-auto lg:mb-12"
    >
      <template v-for="pairedText in hoverablePairedTexts" :key="pairedText.id">
        <paired-text
          :class="pairedText.classes.container"
          :text-left="pairedText.textContent.left"
          :text-right="pairedText.textContent.right"
          :text-left-classes="pairedText.classes.leftPair"
          :text-right-classes="pairedText.classes.rightPair"
          :animate-left-in-pixels="pairedText.animatePx.left"
          :animate-right-in-pixels="pairedText.animatePx.right"
          @text-hover-left="pairedText.hover.left"
          @text-hover-right="pairedText.hover.right"
          @text-hover-leave="pairedText.hover.leave"
        />
      </template>
    </div>
  </div>
</template>
