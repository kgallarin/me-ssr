import type { IPairedText, PairedTextData } from '@/types/animations.ts';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';
import { stackedBackgroundSeeder } from '~/utils/factories/stacked.background.factory';
import { textPairSeeder } from '~/utils/factories/text.pair.factory.ts';

export const useHeroAnimation = () => {
  const createTextPair = (
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
  ): IPairedText => textPairSeeder(data, hover, hoveredAny);

  const createStackedBackground = (
    data: {
      id: string;
      bg: {
        imagePath: string;
        classes: string;
      };
    },
    animation: TargetAndTransition,
    transition: ValueAnimationTransition,
  ) => stackedBackgroundSeeder(data, animation, transition);

  return {
    createTextPair,
    createStackedBackground,
  };
};
