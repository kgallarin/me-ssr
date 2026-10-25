import type { HoverDirections } from '@/types/animations.ts';

export const useHoverAnimationState = () => {
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
    isAnyHoveredLeft.value = false;
    isAnyHoveredRight.value = true;
  };

  const handleHoverLeave = () => {
    currentHover.value = 'none';
    currentImage.value = '/images/me/kg_art_3.webp';
    isAnyHoveredLeft.value = false;
    isAnyHoveredRight.value = false;
  };

  return {
    isAnyHoveredLeft,
    isAnyHoveredRight,
    currentHover,
    currentImage,
    handleHoverLeft,
    handleHoverRight,
    handleHoverLeave,
  };
};
