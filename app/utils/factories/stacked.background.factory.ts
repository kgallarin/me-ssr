import type { AnimatedBg } from '@/types/Animations.ts';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';

export const stackedBackgroundSeeder = (
  data: {
    id: string;
    bg: {
      imagePath: string;
      classes: string;
    };
  },
  animation: TargetAndTransition,
  transition: ValueAnimationTransition,
): AnimatedBg => ({
  id: data.id,
  bg: {
    imagePath: data.bg.imagePath,
    classes: data.bg.classes,
  },
  animation,
  transition,
});
