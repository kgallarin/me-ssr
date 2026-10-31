import type { PaginatedResponse } from '@/types/Api.ts';
import type { Image } from '@/types/App';
import type { CarouselConfig } from '@/types/App.ts';
import type { FontAwesomeIconObject } from '@/types/Icons.ts';

export interface ProjectsPayload {
  projects: PaginatedResponse<Project>;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  order: number;
  icon: FontAwesomeIconObject[];
  carouselSettings?: CarouselConfig;
  images: Image[];
}
