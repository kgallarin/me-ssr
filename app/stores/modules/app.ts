import { useBreakpoints } from '@vueuse/core';

export const useAppStore = defineStore('app', () => {
  const breakpoints = useBreakpoints({
    sm: 595,
    md: 768,
    lg: 1024,
    xl: 1280,
  });

  const queryBreakpoints = <T>(
    desktopValue: T,
    tabletValue: T,
    mobileValue: T,
    smallerTabletValue?: T,
  ): T => {
    if (breakpoints.greaterOrEqual('lg').value) {
      return desktopValue;
    }

    if (breakpoints.between('sm', 'md').value) {
      return smallerTabletValue !== undefined ? smallerTabletValue : tabletValue;
    }

    if (breakpoints.greaterOrEqual('md').value) {
      return tabletValue;
    }

    return mobileValue;
  };

  const isDesktop = computed((): boolean => breakpoints.greaterOrEqual('lg').value);

  return {
    breakpoints,
    queryBreakpoints,

    isDesktop,
  };
});
