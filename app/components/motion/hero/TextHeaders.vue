<script setup lang="ts">
  import { motion } from 'motion-v';
  import { computed } from 'vue';
  import type { ITextHeader } from '@/types/animations.ts';

  const props = defineProps<{
    pairedTextHeaders: ITextHeader;
  }>();

  const computedProps = computed(() => props.pairedTextHeaders);
</script>

<template>
  <motion.div
    :initial="computedProps.initial"
    :animate="computedProps.animation"
    :transition="computedProps.transition"
  >
    <h3
      class="font-proxima 2xs:text-lg xs:text-2xl font-bold sm:text-4xl md:mb-1 lg:mb-3 xl:text-6xl"
      :class="[
        {
          'text-black':
            computedProps.direction === 'left' && computedProps.theme === 'dark',
        },
      ]"
    >
      {{ computedProps.label }}
    </h3>
    <p
      class="shadow-thickens mr-auto hidden text-left font-light md:inline-block md:text-sm lg:w-3/4 lg:text-xl xl:w-5/6 xl:pl-[3%]"
      :class="[
        {
          'text-black':
            computedProps.direction === 'left' && computedProps.theme === 'dark',
        },
      ]"
    >
      <slot
        name="sub-text"
        :direction="computedProps.direction"
        :theme="computedProps.theme"
      />
    </p>
  </motion.div>
</template>
