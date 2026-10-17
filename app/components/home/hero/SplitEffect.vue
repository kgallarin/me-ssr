<script setup lang="ts">
  import { ref, toRefs, watch } from 'vue';
  import { motion } from 'motion-v';

  import PairedText from '@components/home/hero/PairedText.vue';
  import type { HoverablePairedText } from '@/types/animations.ts';
  import AnimatedBackgroundImage from '@components/motion/AnimatedBackgroundImage.vue';
  import SwooshLayeredBg from '@components/motion/SwooshLayeredBg.vue';

  const isAnyHoveredLeft = ref(false);
  const isAnyHoveredRight = ref(false);

  export type CurrentHovered = 'none' | 'left' | 'right';
  const currentImage = ref('/images/me/kg_art_3.webp');

  const props = withDefaults(
    defineProps<{
      currentHover?: CurrentHovered;
    }>(),
    {
      currentHover: 'none',
    },
  );

  const { currentHover } = toRefs(props);

  const emit = defineEmits(['hover-left', 'hover-right', 'hover-leave']);

  watch(currentHover, (newVal) => {
    console.log(newVal, 'eer');
  });
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-0">
    <swoosh-layered-bg
      img-url1="/images/me/kg_art_2.webp"
      container-classes="pointer-events-none absolute inset-0 z-0"
      first-bg-classes="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat md:bg-contain"
      :is-hovered-left="currentHover === 'left'"
      :animate-prop-bg1="{
        clipPath:
          currentHover === 'right'
            ? 'inset(0 100% 0 0)'
            : currentHover === 'left'
              ? 'inset(0 0% 0 0)'
              : 'inset(0 50% 0 0)',
      }"
      :transition-prop-bg1="{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }"
      img-url2="/images/me/kg_art_1.webp"
      second-bg-classes="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat md:bg-contain"
      :is-hovered-right="currentHover === 'right'"
      :animate-prop-bg2="{
        clipPath:
          currentHover === 'left'
            ? 'inset(0 0 0 100%)'
            : currentHover === 'right'
              ? 'inset(0 0 0 0%)'
              : 'inset(0 0 0 50%)',
      }"
      :transition-prop-bg2="{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }"
    />
  </div>
</template>
