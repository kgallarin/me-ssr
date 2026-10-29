import type { PaginatedResponse } from '@/types/Api.ts';
import type { CarouselConfig, FontAwesomeIconObject } from '@/types/App.ts';
import type { Image } from '@/types/Responses';

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
