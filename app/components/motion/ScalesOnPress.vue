<script lang="ts" setup>
  import { computed } from 'vue';

  import { type TargetAndTransition, motion } from 'motion-v';

  const props = withDefaults(
    defineProps<{
      whilePress?: TargetAndTransition;
      whileHover?: TargetAndTransition;
    }>(),
    {
      whilePress: () => ({
        scale: 0.95,
      }),
      whileHover: () => ({
        scale: 1.0,
      }),
    },
  );

  const whilePress = computed(() => props.whilePress);
  const whileHover = computed(() => props.whileHover);
</script>

<template>
  <motion.div :while-hover="whileHover" :while-press="whilePress">
    <slot />
  </motion.div>
</template>
