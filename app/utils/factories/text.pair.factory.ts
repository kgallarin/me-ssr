import type { IPairedText, PairedTextData } from '@/types/animations';

export const textPairSeeder = (
  data: PairedTextData,

  hover: {
    left: () => void;
    right: () => void;
    leave: () => void;
  },

  hoveredAny: {
    left: boolean;
    right: boolean;
  },

  // evaluated responsive values
  resolvedAnimatedPx: { left: number; right: number },
): IPairedText => {
  return {
    id: data.id,
    textContent: {
      left: data.leftTextContent,
      right: data.rightTextContent,
    },
    classes: {
      container: data.containerClass,
      leftPair: 'mx-auto',
      rightPair: 'mx-auto',
    },
    animatePx: {
      left: resolvedAnimatedPx.left,
      right: resolvedAnimatedPx.right,
    },
    hover: hover,
    hoveredAny: hoveredAny,
    ...(data.darken ? { darken: data.darken } : {}),
  };
};
