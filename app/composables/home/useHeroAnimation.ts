import type { IPairedText, PairedTextData } from '@/types/SplitHeroAnimations.ts';
import { PAIRED_TEXT_DATA } from '@app/assets/constants';
import { useAppStore } from '@store/modules/app.ts';
import { useHoverAnimationState } from '~/composables/home/useHoverAnimationState.ts';
import { useSwooshBackgroundAnimation } from '~/composables/home/useSwooshBackgroundAnimation.ts';
import { textPairSeeder } from '~/utils/factories/text.pair.factory.ts';

export const useHeroAnimation = () => {
  const appStore = useAppStore();
  const {
    currentHover,
    handleHoverLeft,
    handleHoverRight,
    handleHoverLeave,
    isAnyHoveredLeft,
    isAnyHoveredRight,
  } = useHoverAnimationState();

  const { swooshBgPair1, swooshBgPair2 } =
    useSwooshBackgroundAnimation(currentHover);

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

    // evaluated responsive values
    resolvedAnimatedPx: { left: number; right: number },
  ): IPairedText => textPairSeeder(data, hover, hoveredAny, resolvedAnimatedPx);

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
        {
          left: appStore.queryBreakpoints(
            data.animatePxLeft?.desktop ?? 0,
            data.animatePxLeft?.tablet ?? 0,
            data.animatePxLeft?.mobile ?? 0,
          ),
          right: appStore.queryBreakpoints(
            data.animatePxRight?.desktop ?? 0,
            data.animatePxRight?.tablet ?? 0,
            data.animatePxRight?.mobile ?? 0,
          ),
        },
      ),
    ),
  );
  return {
    hoverablePairedTexts,

    currentHover,
    swooshBgPair1,
    swooshBgPair2,
  };
};
