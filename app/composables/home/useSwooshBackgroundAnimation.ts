import type { StackedAnimatedBg } from '@/types/animations.ts';
import {
  GRAY_AND_BLUE_SWOOSH,
  GREEN_AND_YELLOW_SWOOSH,
} from '@app/assets/constants';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';
import { stackedBackgroundSeeder } from '~/utils/factories/stacked.background.factory';

export const useSwooshBackgroundAnimation = (currentHover: Ref<string>) => {
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
          delay: index === 0 ? 0.2 : 0,
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

  return {
    swooshBgPair1,
    swooshBgPair2,
  };
};
