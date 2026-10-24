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
      :class="[
        {
          'text-black':
            computedProps.direction === 'left' && computedProps.theme === 'dark',
        },
        computedProps.headerClasses,
      ]"
    >
      {{ computedProps.label }}
    </h3>
    <p
      :class="[
        {
          'text-black':
            computedProps.direction === 'center' && computedProps.theme === 'dark',
        },
        computedProps.subTextClasses,
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
