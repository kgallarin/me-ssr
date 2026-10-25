import type { PairedTextData } from '@/types/animations.ts';

export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'jwt:auth_token',
} as const;
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const API = {
  TIMEOUT_MS: 30_000,
} as const;

export const enum Theme {
  LIGHT = 0,
  DARK = 1,
}

export const BASE_TOAST_TOP_POS = ['top', 'top-right', 'top-left'] as const;

export const BASE_TOAST_RIGHT_POS = [
  'top',
  'bottom',
  'top-right',
  'bottom-right',
] as const;

export const PAIRED_TEXT_DATA: PairedTextData[] = [
  {
    id: '1',
    leftTextContent: 'Mockup Tools',
    rightTextContent: 'S/CSS',
    containerClass:
      '2xs:ml-10 2xs:w-[230px] 2xs:text-base xs:ml-16 xs:w-[280px] text-base whitespace-nowrap sm:mx-auto sm:w-[240px] md:w-auto md:text-xl lg:w-[400px] lg:text-2xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 140,
      tablet: 90,
      mobile: 70,
    },
    animatePxRight: {
      desktop: 50,
      tablet: 30,
      mobile: 20,
    },
  },
  {
    id: '2',
    leftTextContent: 'Photoshop',
    rightTextContent: 'TS/JavaScript',
    containerClass:
      '2xs:mb-12 2xs:text-base xs:mb-12 font-light whitespace-nowrap sm:mb-0 sm:-ml-16 md:-ml-8 md:text-xl lg:-ml-10 lg:text-4xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 140,
      tablet: 80,
      mobile: 90,
    },
    animatePxRight: {
      desktop: 120,
      tablet: 80,
      mobile: 50,
    },
    darken: true,
  },
  {
    id: '3',
    leftTextContent: 'User Experience',
    rightTextContent: 'State Management',
    containerClass:
      '2xs:text-base whitespace-nowrap sm:-ml-8 md:-ml-5 md:text-xl lg:-ml-20 lg:text-3xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 160,
      tablet: 130,
      mobile: 80,
    },
    animatePxRight: {
      desktop: 180,
      tablet: 120,
      mobile: 60,
    },
  },
  {
    id: '4',
    leftTextContent: 'Animation',
    rightTextContent: 'Web/Mobile',
    containerClass:
      '2xs:text-base xs:ml-16 xs:w-[290px] whitespace-nowrap sm:-ml-24 sm:w-[660px] md:mx-auto md:-ml-10 md:w-[768px] md:text-lg lg:-ml-36 lg:w-[900px] lg:text-5x',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 220,
      tablet: 90,
      mobile: 20,
    },
    animatePxRight: {
      desktop: 280,
      tablet: 80,
      mobile: 20,
    },
    darken: true,
  },
  {
    id: '5',
    leftTextContent: 'Communication',
    rightTextContent: 'Structure,Testing',
    containerClass:
      'xs:-ml-18 2xs:text-base xs:w-[380px] whitespace-nowrap sm:-ml-20 md:mx-auto md:-ml-10 md:w-[658px] md:text-lg lg:-ml-56 lg:w-[980px] lg:text-3xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 220,
      tablet: 110,
      mobile: 50,
    },
    animatePxRight: {
      desktop: 240,
      tablet: 110,
      mobile: 80,
    },
  },
  {
    id: '6',
    leftTextContent: 'Detail Oriented',
    rightTextContent: 'Forms, GraphQL',
    containerClass:
      '2xs:text-base whitespace-nowrap sm:-ml-28 md:mx-auto md:-ml-20 md:w-[730px] md:text-lg lg:-ml-72 lg:w-[1080px] lg:text-4xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 240,
      tablet: 100,
      mobile: 80,
    },
    animatePxRight: {
      desktop: 280,
      tablet: 100,
      mobile: 60,
    },
    darken: true,
  },
  {
    id: '7',
    leftTextContent: 'Responsive',
    rightTextContent: 'Laravel/PHP',
    containerClass:
      '2xs:text-base whitespace-nowrap sm:-ml-36 sm:w-[680px] md:mx-auto md:-ml-28 md:w-[768px] md:text-lg lg:-ml-96 lg:w-[1250px] lg:text-4xl',
    leftPairClass: 'mx-auto',
    rightPairClass: 'mx-auto',
    animatePxLeft: {
      desktop: 180,
      tablet: 100,
      mobile: 120,
    },
    animatePxRight: {
      desktop: 170,
      tablet: 80,
      mobile: 60,
    },
    darken: true,
  },
];

export const GRAY_AND_BLUE_SWOOSH = {
  stack: [
    {
      id: '1',
      bg: {
        imagePath: '/images/backgrounds/webp/swoosh_gray.webp',
        classes: 'absolute inset-0 bg-right bg-no-repeat',
      },
    },
    {
      id: '2',
      bg: {
        imagePath: '/images/backgrounds/webp/swoosh_blue.webp',
        classes: 'absolute inset-0 bg-right bg-no-repeat',
      },
    },
  ],
};

export const GREEN_AND_YELLOW_SWOOSH = {
  stack: [
    {
      id: '1',
      bg: {
        imagePath: '/images/backgrounds/webp/swoosh_green.webp',
        classes: 'absolute inset-0 bg-left bg-no-repeat',
      },
    },
    {
      id: '2',
      bg: {
        imagePath: '/images/backgrounds/webp/swoosh_yellow.webp',
        classes: 'absolute inset-0 bg-left bg-no-repeat',
      },
    },
  ],
};
