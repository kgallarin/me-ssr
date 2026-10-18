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
      left: data.animatePxLeft ?? 70,
      right: data.animatePxRight ?? 70,
    },
    hover: hover,
    hoveredAny: hoveredAny,
    ...(data.darken ? { darken: data.darken } : {}),
  };
};
