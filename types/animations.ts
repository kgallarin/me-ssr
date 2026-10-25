import type { AppTheme } from '@/types/app.ts';
import type { Nullable } from '@/types/utils';
import type { TargetAndTransition, ValueAnimationTransition } from 'motion-v';

export interface AnimatedBg {
  id: string;
  bg: {
    classes: string;
    imagePath: string;
  };
  animation: TargetAndTransition;
  transition: ValueAnimationTransition;
}

export type StackedAnimatedBg = {
  stack: AnimatedBg[];
};

export type NullableAnimatedBg = Nullable<AnimatedBg>;

export type CustomAnimatesToBreakpoint = {
  desktop?: number;
  tablet?: number;
  mobile?: number;
};

export interface IPairedText {
  id?: string;

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

export type PairedTextData = Pick<IPairedText, 'id' | 'darken'> & {
  leftTextContent: IPairedText['textContent']['left'];
  rightTextContent: IPairedText['textContent']['right'];
  containerClass: IPairedText['classes']['container'];
  leftPairClass: IPairedText['classes']['leftPair'];
  rightPairClass: IPairedText['classes']['leftPair'];
  animatePxLeft?: CustomAnimatesToBreakpoint;
  animatePxRight?: CustomAnimatesToBreakpoint;
};

export type HoverDirections = 'none' | 'left' | 'right';
export interface ITextHeader {
  theme: AppTheme;
  label: string;
  direction: HoverDirections;
  initial: TargetAndTransition;
  animation: TargetAndTransition;
  transition: ValueAnimationTransition;
  headerClasses: string;
  subTextClasses: string;
}
