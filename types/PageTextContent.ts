import type { Image } from '@/types/App';

export interface ContentSection {
  title?: string;
  text: string;
}
export interface PageTextContent {
  id?: string;
  key: string;
  title: string;
  subtitle?: string;
  content: ContentSection[];
  heroImages: Image[];
  socialImages?: Image[];
}

export interface PageTextContentPayload {
  contents: PageTextContent[];
}

export interface PageTextContentPayloadSingle {
  content: PageTextContent;
}
