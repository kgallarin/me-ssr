import { type BASE_TOAST_RIGHT_POS, BASE_TOAST_TOP_POS } from '~/assets/constants';

export type AppTheme = 'light' | 'dark';

export type ToastPosition = (
  typeof BASE_TOAST_TOP_POS | typeof BASE_TOAST_RIGHT_POS
)[number];

export interface ParsedPartSafeHtml {
  type: 'br' | 'a' | 'strong' | 'span' | 'text';
  href?: string;
  class?: string;
  content?: string;
  text?: string;
}

export interface Image {
  url: string;
  alt: string;
}

// splider
export interface SpliderOptions {
  items?: string[] | Image[];
  autoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  aspectRatio?: string;
  itemsToShow?: number;
  gap?: number;
  imageClasses?: string;
  fixedHeight?: string | null;
  rewind?: boolean;
  drag?: boolean;
  breakpoints?: Record<string, unknown>;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  rounded?: string;
  imageContainerClass?: string;
}

export interface CarouselConfig {
  autoplay: boolean;
  showIndicators: boolean;
  showArrows: boolean;
}

export interface UseStaggeredVerticalNavOptions {
  isOpen: MaybeRefOrGetter<boolean>;
  theme?: MaybeRefOrGetter<AppTheme>;
  onAnimationComplete?: () => void;
  staggerDelay?: number;
  childStaggerDelay?: number;
  initialYOffset?: number;
}

export interface UseLiveTimeOptions {
  timeZone?: string;
  locale?: string;
}

export interface UseToastOptions {
  show: MaybeRefOrGetter<boolean>;
  position?: MaybeRefOrGetter<ToastPosition>;
  index?: MaybeRefOrGetter<number>;
  toastOffset?: MaybeRefOrGetter<number>;
  showDelay?: MaybeRefOrGetter<number>;
  onClose?: () => void;
}
