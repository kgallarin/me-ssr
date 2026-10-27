import { CarouselConfig, FontAwesomeIconObject } from '@/types/App.ts';

export interface Image {
  url: string;
  alt: string;
}

export interface CarouselContent {
  id: string;
  title: string;
  description: string;
  link?: string;
  order: number;
  icon: FontAwesomeIconObject[];
  carouselSettings?: CarouselConfig;
  images: Image[];
}
