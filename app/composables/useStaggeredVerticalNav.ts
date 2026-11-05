import { ref } from 'vue';

import type { UseStaggeredVerticalNavOptions } from '@/types/App.ts';
import { useResizeObserver } from '@vueuse/core';
import { type MotionProps, useDomRef } from 'motion-v';

export function useStaggeredVerticalNav(options: UseStaggeredVerticalNavOptions) {
  const targetRef = useDomRef();
  const dimensions = ref({ width: 0, height: 0 });

  const {
    staggerDelay = 0.07,
    childStaggerDelay = 0.05,
    initialYOffset = 50,
  } = options;

  useResizeObserver(targetRef, (entries) => {
    const entry = entries[0];
    if (entry) {
      const { height, width } = entry.contentRect;
      dimensions.value = { height, width };
    }
  });

  const containerVariants: MotionProps['variants'] = {
    open: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: childStaggerDelay,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 80, velocity: -100 },
      },
    },
    closed: {
      y: initialYOffset,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -200 },
      },
    },
  };

  const backgroundVariants: MotionProps['variants'] = {
    open: (custom?: unknown) => {
      const height = typeof custom === 'number' && custom > 0 ? custom : 1200;
      return {
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
          type: 'spring',
          stiffness: 20,
          restDelta: 2,
        },
      };
    },

    closed: {
      clipPath: 'circle(0px at 0px 0px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const handleAnimationComplete = () => {
    options.onAnimationComplete?.();
  };

  return {
    targetRef,
    dimensions,
    containerVariants,
    itemVariants,
    backgroundVariants,
    handleAnimationComplete,
  };
}
