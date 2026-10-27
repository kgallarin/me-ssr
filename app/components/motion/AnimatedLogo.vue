<script setup lang="ts">
  import { motion } from 'motion-v';

  const props = withDefaults(
    defineProps<{
      spinnerTrailColor?: string;
      spinnerColorBorder?: string;
      forLight?: boolean;
    }>(),
    {
      spinnerTrailColor: 'border-r-[#171717]',
      spinnerColorBorder: 'border-[white]',
      forLight: false,
    },
  );
</script>

<template>
  <div
    class="relative container flex h-full min-h-[44px] w-full min-w-[44px] items-center justify-center rounded-lg"
  >
    <motion.div
      :class="`absolute h-full min-h-[44px] w-full min-w-[44px] rounded-full border-2 border-solid will-change-transform ${props.spinnerColorBorder} ${props.spinnerTrailColor}`"
      :animate="{ transform: 'rotate(360deg)' }"
      :transition="{
        duration: 14.5,
        repeat: Infinity,
        ease: 'linear',
      }"
    />

    <img
      class="h-full w-full"
      alt="kevin gallarin"
      :src="
        !props.forLight
          ? 'images/me/webp/imgkg_nb_white.webp'
          : 'images/me/webp/imkg_no_ring.webp'
      "
    />
  </div>
</template>
