<script setup lang="ts">
  import { ref } from 'vue';

  import { useAppStore } from '@/Store/Modules/App';

  import HeroImageTextShard from '@/Components/Partials/Home/LandingHero/HeroAnimatedTexts/HeroImageTextShard.vue';

  const appStore = useAppStore();

  const isAnyHoveredLeft = ref(false);
  const isAnyHoveredRight = ref(false);

  const handleHoverLeft = () => {
    isAnyHoveredLeft.value = true;
    isAnyHoveredRight.value = false;
    emit('hover-left');
  };
  const handleHoverRight = () => {
    isAnyHoveredRight.value = true;
    isAnyHoveredLeft.value = false;
    emit('hover-right');
  };
  const handleHoverLeave = () => {
    isAnyHoveredLeft.value = false;
    isAnyHoveredRight.value = false;
    emit('hover-leave');
  };

  const emit = defineEmits(['hover-left', 'hover-right', 'hover-leave']);
</script>

<template>
  <div
    class="relative z-30 mx-auto flex flex-col font-light xs:-mt-2 xs:w-[420px] sm:mt-44 sm:w-[500px] md:mt-56 md:w-[700px] lg:mb-12 lg:mt-auto"
  >
    <hero-image-text-shard
      class="whitespace-nowrap text-base 2xs:ml-10 2xs:w-[230px] 2xs:text-base xs:ml-16 xs:w-[280px] sm:mx-auto sm:w-[240px] md:w-auto md:text-xl lg:w-[400px] lg:text-2xl"
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
      class="whitespace-nowrap font-light 2xs:mb-12 2xs:text-base xs:mb-12 sm:-ml-16 sm:mb-0 md:-ml-8 md:text-xl lg:-ml-10 lg:text-4xl"
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
      class="whitespace-nowrap 2xs:text-base sm:-ml-8 md:-ml-5 md:text-xl lg:-ml-20 lg:text-3xl"
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
      class="whitespace-nowrap 2xs:text-base xs:ml-16 xs:w-[290px] sm:-ml-24 sm:w-[660px] md:mx-auto md:-ml-10 md:w-[768px] md:text-lg lg:-ml-36 lg:w-[900px] lg:text-5xl"
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
      class="xs:-ml-18 whitespace-nowrap 2xs:text-base xs:w-[380px] sm:-ml-20 md:mx-auto md:-ml-10 md:w-[658px] md:text-lg lg:-ml-56 lg:w-[980px] lg:text-3xl"
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
      class="whitespace-nowrap 2xs:text-base sm:-ml-28 md:mx-auto md:-ml-20 md:w-[730px] md:text-lg lg:-ml-72 lg:w-[1080px] lg:text-4xl"
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
      class="whitespace-nowrap 2xs:text-base sm:-ml-36 sm:w-[680px] md:mx-auto md:-ml-28 md:w-[768px] md:text-lg lg:-ml-96 lg:w-[1250px] lg:text-4xl"
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
</template>
