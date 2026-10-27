export interface NavLink {
  label: string;
  icon: string;
  to?: string;
  emit?: string;
}

export interface Link {
  name: string;
  href: string;
  icon: string[];
  class?: string;
}

export interface HeroImageTextShardProps {
  textLeft: string;
  textRight: string;
  textLeftClasses?: string;
  textRightClasses?: string;
  animateLeftInPixels?: number;
  animateRightInPixels?: number;
  isAnyHoveredLeft?: boolean;
  isAnyHoveredRight?: boolean;
  darken?: boolean;
}

export interface BaseImageProps {
  src: string;
  alt: string;
  showLoader?: boolean;
  rounded?: string;
  objectFit?: string;
  imageClass?: string;
  imageContainerClass?: string;
}
