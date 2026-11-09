<script setup lang="ts">
  import { type ComponentPublicInstance } from 'vue';

  import ScalesOnPress from '@components/motion/ScalesOnPress.vue';
  import { AnimatePresence, motion } from 'motion-v';

  const props = defineProps<{
    boundaryRef?: ComponentPublicInstance | HTMLElement | null;
    isReady?: boolean;
  }>();

  const { showNavigators, prevPage, nextPage } = usePagePaginationNavOnScroll({
    targetRef: () => props.boundaryRef,
    scrollThreshold: 500,
  });
</script>

<template>
  <!-- Previous Button -->
  <AnimatePresence>
    <motion.div
      v-if="isReady && prevPage && showNavigators"
      key="nav-prev"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.4 }"
      class="fixed -left-5 top-1/2 z-40 -translate-y-1/2 md:-left-12"
    >
      <scales-on-press>
        <nuxt-link
          :to="{ name: prevPage }"
          class="flex h-10 w-10 items-center justify-center rounded-full border-t bg-primary shadow-lg lg:h-20 lg:w-20"
        >
          <fa-icon
            :icon="['fa', 'chevron-left']"
            class="relative -right-2 text-xs text-secondary md:-right-5 md:text-xl"
          />
        </nuxt-link>
      </scales-on-press>
    </motion.div>
  </AnimatePresence>

  <!-- Next Button -->
  <AnimatePresence>
    <motion.div
      v-if="isReady && nextPage && showNavigators"
      key="nav-next"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.4 }"
      class="fixed -right-5 top-1/2 z-40 -translate-y-1/2 md:-right-12"
    >
      <scales-on-press>
        <nuxt-link
          :to="{ name: nextPage }"
          class="flex h-10 w-10 items-center justify-center rounded-full border-t bg-primary lg:h-20 lg:w-20"
        >
          <fa-icon
            :icon="['fa', 'chevron-right']"
            class="relative -left-2 text-xs text-secondary md:-left-5 md:-right-2 md:text-xl"
          />
        </nuxt-link>
      </scales-on-press>
    </motion.div>
  </AnimatePresence>
</template>
