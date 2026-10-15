import type { Nullable } from '@/types/utils';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';

interface SwooshLayerProps {
  bg: {
    classes: string;
    imagePath: string;
  };
  animation: TargetAndTransition;
  transition: TargetAndTransition;
}

export type NullableSwooshLayerProps = Nullable<SwooshLayerProps>;
