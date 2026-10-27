import type { Image } from '@/types/Responses';

export type AppTheme = 'light' | 'dark';

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

// icons
type FaIconSingle = string[];
export interface FontAwesomeIconObject {
  icon: FaIconSingle;
  color: string;
}
