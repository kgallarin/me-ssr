export type AppTheme = 'light' | 'dark';

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

export interface UseLiveTimeOptions {
  timeZone?: string;
  locale?: string;
}
