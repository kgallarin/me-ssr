<script setup lang="ts">
  import type { HoverDirections } from '@/types/Animations.ts';
  import TextHeaders from '@components/motion/landing-hero/TextHeaders.vue';

  const props = defineProps<{
    hoverDirection: HoverDirections;
    leftHeaderText: string;
    rightHeaderText: string;
  }>();
</script>

<template>
  <div
    class="absolute top-[35%] right-0 left-0 z-0 mx-auto flex h-auto w-full items-center justify-between p-0 text-black sm:px-4 md:top-auto md:z-10 md:h-full md:px-8 md:pb-28 xl:max-w-7xl"
  >
    <!-- Background Images for Split Effect -->

    <text-headers
      class="w-1/2 pr-[18%] text-center md:pr-[20%]"
      :paired-text-headers="{
        direction: props.hoverDirection,
        headerClasses:
          'font-proxima 2xs:text-lg xs:text-2xl font-bold sm:text-4xl md:mb-1 lg:mb-3 xl:text-6xl',
        subTextClasses:
          'shadow-thickens mr-auto hidden text-left font-light md:inline-block md:text-sm lg:w-3/4 lg:text-xl xl:w-5/6 xl:pl-[3%]',
        label: props.leftHeaderText,
        theme: 'light',

        initial: { x: 0, opacity: 1 },
        animation: {
          opacity: props.hoverDirection === 'right' ? 0 : 1,
        },
        transition: { duration: 0.8, ease: 'easeOut' },
      }"
    >
      <template #sub-text="{ direction, theme }">
        an eye for design, feels<span
          class="md:hidden xl:inline-block"
          :class="[
            {
              'text-black': direction === 'left' && theme === 'dark',
            },
          ]"
          >and attention to detail</span
        >
      </template>
    </text-headers>

    <text-headers
      class="w-1/2 pl-[15%] text-center"
      :paired-text-headers="{
        direction: props.hoverDirection,
        headerClasses:
          'font-proxima 2xs:text-lg xs:text-2xl font-bold sm:text-4xl md:mb-1 lg:mb-3 xl:text-6xl',
        subTextClasses:
          'shadow-thickens ml-auto hidden pl-2 text-right font-light md:inline-block md:text-sm lg:text-xl xl:w-5/6 xl:pr-[10%]',
        label: props.rightHeaderText,
        theme: 'light',

        initial: { x: 0, opacity: 1 },
        animation: {
          opacity: props.hoverDirection === 'left' ? 0 : 1,
        },
        transition: { duration: 0.8, ease: 'easeOut' },
      }"
    >
      <template #sub-text>
        testing <span class="md:hidden xl:inline-block">, readability </span>
        <br class="md:hidden xl:inline-block" />
        and maintainability
      </template>
    </text-headers>
  </div>
</template>
