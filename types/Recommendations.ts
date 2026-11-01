import type { PaginatedResponse } from '@/types/Api.ts';
import type { Image } from '@/types/App.ts';

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  text: string;
  order: number;
  rating: number;
  linkedIn?: boolean;
  avatar?: Image;
}

export interface TestimonialsPayload {
  recommendations: PaginatedResponse<Testimonial>;
}
