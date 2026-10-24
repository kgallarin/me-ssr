<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { motion } from 'motion-v';
  import type { IPairedText } from '@/types/animations.ts';

  const props = defineProps<{
    pairedTextsProps: IPairedText;
  }>();

  const emit = defineEmits(['textHoverLeft', 'textHoverRight', 'textHoverLeave']);

  const computedProps = computed(() => props.pairedTextsProps);

  const isHoveredLeft = ref(false);
  const isHoveredRight = ref(false);

  const isDarkTheme = computed(() => 1);
  const getAnimatedColor = (isHovered: boolean) => {
    if (!isDarkTheme.value) {
      return isHovered || computedProps.value.darken ? '#010303' : '#1f2a2d';
    } else if (isDarkTheme.value) {
      return isHovered ? '#010303' : '#fff';
    } else {
      return computedProps.value.darken && !isHovered ? '#fefefe' : '#fff';
    }
  };

  const handleMouseOverLeft = () => {
    isHoveredLeft.value = true;
    emit('textHoverLeft');
  };

  const handleMouseLeaveLeft = () => {
    isHoveredLeft.value = false;
    emit('textHoverLeave');
  };

  const handleMouseOverRight = () => {
    isHoveredRight.value = true;
    emit('textHoverRight');
  };

  const handleMouseLeaveRight = () => {
    isHoveredRight.value = false;
    emit('textHoverLeave');
  };
</script>

<template>
  <div
    :class="[
      'text-shard mb-2 grid grid-cols-2 justify-items-stretch gap-4',
      computedProps.classes.container,
    ]"
  >
    <!--    text left-->
    <div class="relative flex cursor-pointer">
      <div
        data-testid="shard-hoverable-left"
        class="hover-me-baby absolute inset-0 z-10"
        @mouseover="handleMouseOverLeft"
        @mouseleave="handleMouseLeaveLeft"
      ></div>
      <motion.div
        data-testid="shard-text-left"
        :class="[computedProps.classes.leftPair, 'ml-auto', 'font-light']"
        :style="{
          webkitTextStroke: isHoveredLeft
            ? '0.4px currentColor'
            : computedProps.darken
              ? '0.2px currentColor'
              : '0px currentColor',
          transition: '-webkit-text-stroke 0.8s ease-out',
        }"
        :initial="{
          x: 0,
          color: computedProps.darken ? '#010303' : '#E5E4E2',
          fontWeight: 300,
          opacity: 1,
        }"
        :animate="{
          x: isHoveredLeft ? -computedProps.animatePx.left : 0,
          color: getAnimatedColor(isHoveredLeft),
          fontWeight: isHoveredLeft ? 700 : computedProps.darken ? 500 : 300,
          opacity: computedProps.hoveredAny.right ? 0 : 1,
        }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        {{ computedProps.textContent.left }}
      </motion.div>
    </div>

    <!--    text right-->
    <div class="relative flex cursor-pointer">
      <div
        data-testid="shard-hoverable-right"
        class="hover-me-baby absolute inset-0 z-50"
        @mouseover="handleMouseOverRight"
        @mouseleave="handleMouseLeaveRight"
      ></div>

      <motion.div
        data-testid="shard-text-right"
        :class="[computedProps.classes.rightPair, 'font-light']"
        :style="{
          webkitTextStroke: isHoveredRight
            ? '0.4px currentColor'
            : computedProps.darken
              ? '0.2px currentColor'
              : '0px currentColor',
          transition: '-webkit-text-stroke 0.8s ease-out',
        }"
        :initial="{ x: 0, color: '#E5E4E2', fontWeight: 300, opacity: 1 }"
        :animate="{
          x: isHoveredRight ? computedProps.animatePx.right : 0,
          color: getAnimatedColor(isHoveredRight),
          fontWeight: isHoveredRight ? 700 : computedProps.darken ? 500 : 300,
          opacity: computedProps.hoveredAny.left ? 0 : 1,
        }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        {{ computedProps.textContent.right }}
      </motion.div>
    </div>
  </div>
</template>

<style lang="scss">
  .text-shard {
    div {
      @apply leading-tight;
    }
  }
</style>
