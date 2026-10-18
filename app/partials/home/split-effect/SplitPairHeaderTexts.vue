<script setup lang="ts">
  import TextHeaders from '@components/motion/hero/TextHeaders.vue';
  import type { HoverDirections } from '@/types/animations.ts';

  const props = defineProps<{
    hoverDirection: HoverDirections;
  }>();
</script>

<template>
  <div
    class="absolute top-[35%] right-0 left-0 z-50 mx-auto flex h-auto w-full items-center justify-between p-0 text-black sm:px-4 md:top-auto md:z-10 md:h-full md:px-8 md:pb-28 lg:max-w-screen-lg xl:max-w-screen-xl"
  >
    <text-headers
      class="w-1/2 pr-[18%] text-center md:pr-[20%]"
      :paired-text-headers="{
        direction: props.hoverDirection,
        label: 'perceptive',
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
      class="w-1/2 pr-[18%] text-center md:pr-[20%]"
      :paired-text-headers="{
        direction: props.hoverDirection,
        label: '<coding />',
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
        and maintainability >
      </template>
    </text-headers>
  </div>
</template>
