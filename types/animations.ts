import type { Nullable } from '@/types/utils';
import type { TargetAndTransition } from 'motion-v';

interface SwooshLayerProps {
  bg: {
    classes: string;
    imagePath: string;
  };
  animation: TargetAndTransition;
  transition: TargetAndTransition;
}

export type NullableSwooshLayerProps = Nullable<SwooshLayerProps>;

export interface HoverablePairedText {
  id: string;

  animatePx: {
    left: number;
    right: number;
  };

  classes: {
    container: string;
    leftPair: string;
    rightPair: string;
  };

  darken?: boolean;

  hover: {
    left: () => void;
    right: () => void;
    leave: () => void;
  };

  hoveredAny: {
    left: boolean;
    right: boolean;
  };

  textContent: {
    left: string;
    right: string;
  };
}
