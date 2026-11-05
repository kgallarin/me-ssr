import { useBreakpoints } from '@vueuse/core';

export const useAppStore = defineStore('app', () => {
  const breakpoints = useBreakpoints({
    sm: 595,
    md: 768,
    lg: 1024,
    xl: 1280,
  });

  const sideBarState = ref(false);

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

  function setSidebar(state: boolean): void {
    sideBarState.value = state;
  }

  function toggleSidebar(): void {
    const sidebarNewState =
      sideBarState.value === sideBarState.value
        ? !sideBarState.value
        : sideBarState.value;
    setSidebar(sidebarNewState);
  }

  return {
    sideBarState,
    breakpoints,
    isDesktop,
    setSidebar,
    queryBreakpoints,
    toggleSidebar,
  };
});
