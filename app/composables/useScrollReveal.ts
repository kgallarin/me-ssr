import type { ScrollRevealOptions } from '@/types/ScrollReveal.ts';
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core';

// singleton, one listener
const { y } = useWindowScroll();
const prevY = ref(y.value);
const isScrollingDown = ref(true);

watch(y, (newValY: number): void => {
  if (newValY > prevY.value) {
    isScrollingDown.value = true;
  } else if (newValY < prevY.value) {
    isScrollingDown.value = false;
  }

  prevY.value = newValY;
});

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const target = ref<HTMLElement | null>(null);
  const isVisible = ref(false);
  const skipAnimation = ref(false);

  useIntersectionObserver(
    target,
    (entries: IntersectionObserverEntry[]): void => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        if (!toValue(options.animateOnlyScrollDown) || isScrollingDown.value) {
          isVisible.value = true;
          skipAnimation.value = false;
        } else {
          isVisible.value = true;
          skipAnimation.value = true;
        }
      } else if (!toValue(options.animateOnce)) {
        isVisible.value = false;
      }
    },
    {
      threshold: options.threshold ?? 0.1,
    },
  );

  const getInitialX = (dir: string, dist: number): number => {
    if (dir === 'left') return dist;
    if (dir === 'right') return -dist;

    return 0;
  };

  const getInitialY = (dir: string, dist: number): number | undefined => {
    if (dir === 'up') return dist;
    if (dir === 'down') return -dist;
  };

  return {
    target,
    isVisible,
    skipAnimation,
    getInitialX,
    getInitialY,
  };
}
