import type {
  HoverDirections,
  IPairedText,
  PairedTextData,
  StackedAnimatedBg,
} from '@/types/animations.ts';
import {
  GRAY_AND_BLUE_SWOOSH,
  GREEN_AND_YELLOW_SWOOSH,
  PAIRED_TEXT_DATA,
} from '@app/assets/constants';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';
import { stackedBackgroundSeeder } from '~/utils/factories/stacked.background.factory';
import { textPairSeeder } from '~/utils/factories/text.pair.factory.ts';

export const useHeroAnimation = () => {
  const isAnyHoveredLeft = ref(false);
  const isAnyHoveredRight = ref(false);

  const currentHover = ref<HoverDirections>('none');
  const currentImage = ref('/images/me/kg_art_3.webp');

  const handleHoverLeft = () => {
    currentHover.value = 'left';
    currentImage.value = '/images/me/kg_art_2.webp';
    isAnyHoveredLeft.value = true;
    isAnyHoveredRight.value = false;
  };

  const handleHoverRight = () => {
    currentHover.value = 'right';
    currentImage.value = '/images/me/kg_art_1.webp';
  };

  const handleHoverLeave = () => {
    currentHover.value = 'none';
    currentImage.value = '/images/me/kg_art_3.webp';
  };

  const hoverablePairedTexts = computed((): IPairedText[] =>
    PAIRED_TEXT_DATA.map((data: PairedTextData): IPairedText =>
      createTextPair(
        data,
        {
          left: handleHoverLeft,
          right: handleHoverRight,
          leave: handleHoverLeave,
        },
        {
          left: isAnyHoveredLeft.value,
          right: isAnyHoveredRight.value,
        },
      ),
    ),
  );

  const swooshBgPair1 = computed((): StackedAnimatedBg => ({
    stack: GRAY_AND_BLUE_SWOOSH.stack.map((item, index) =>
      createStackedBackground(
        item,
        {
          opacity: currentHover.value === 'right' ? 1 : 0,
          x: currentHover.value === 'right' ? 0 : 10,
        },
        {
          duration: 0.6,
          delay: index === 0 ? 0.2 : 0, // index 0 animates second, index 1 animates first
          ease: 'easeOut',
        },
      ),
    ),
  }));

  const swooshBgPair2 = computed((): StackedAnimatedBg => ({
    stack: GREEN_AND_YELLOW_SWOOSH.stack.map((item, index) =>
      createStackedBackground(
        item,
        {
          opacity: currentHover.value === 'left' ? 1 : 0,
          x: currentHover.value === 'left' ? 0 : 10,
        },
        {
          duration: 0.6,
          delay: index === 0 ? 0.2 : 0,
          ease: 'easeOut',
        },
      ),
    ),
  }));
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

    currentHover,

    hoverablePairedTexts,

    swooshBgPair1,
    swooshBgPair2,
  };
};
