import type { Ref } from 'vue';

import { Theme } from '@app/assets/constants.ts';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { defineStore } from 'pinia';

export interface IBreakpoints {
  greater: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => Ref<boolean>;
  greaterOrEqual: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => Ref<boolean>;
  smaller: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => Ref<boolean>;
  smallerOrEqual: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => Ref<boolean>;
  between: (
    a: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
    b: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  ) => Ref<boolean>;
  isGreater: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
  isGreaterOrEqual: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
  isSmaller: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
  isSmallerOrEqual: (k: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
}

export interface AppState {
  breakpoints: IBreakpoints;
  mobileMenuOpen: boolean;
  responsiveDataListRows: number;
  queryParams: {
    [key: string]: string | null;
  } | null;
  routeFrom: string | null;
  scrollPosition: {
    x: number;
    y: number;
  } | null;
  theme: Theme;
  isSidebarOpen: boolean;
}

const state = (): AppState => ({
  responsiveDataListRows: 2,
  scrollPosition: {
    x: 0,
    y: 0,
  },
  queryParams: null,
  mobileMenuOpen: false,
  routeFrom: null,
  theme: 0,
  isSidebarOpen: false,
});

const getters = {
  isDesktop: (state: AppState) => state.breakpoints.greaterOrEqual('lg').value, // >= lg
  queryBreakpoints:
    (state: AppState) =>
    <T>(
      desktopValue: T,
      tabletValue: T,
      mobileValue: T,
      smallerTabletValue?: T,
    ): T => {
      if (state.breakpoints.greaterOrEqual('lg').value) {
        return desktopValue;
      }
      if (state.breakpoints.between('sm', 'md').value) {
        return smallerTabletValue !== undefined ? smallerTabletValue : tabletValue;
      }
      if (state.breakpoints.greaterOrEqual('md').value) {
        return tabletValue;
      }
      return mobileValue;
    },
  getTheme: (state: AppState): Theme => state.theme,
};

const mutations = {
  setActiveModal(this: { hasActiveModal: boolean }, flag: boolean): void {
    this.hasActiveModal = flag;
  },

  setTheme(this: { theme: Theme }, theme: Theme): void {
    this.theme = theme;
  },

  toggleTheme(this: { theme: Theme }): void {
    this.theme = this.theme === 0 ? 1 : 0;
  },
  setScrollPosition(
    this: { scrollPosition: AppState['scrollPosition'] },
    x: number,
    y: number,
  ): void {
    this.scrollPosition = { x, y };
  },
  closeSidebar(this: { isSidebarOpen: boolean }): void {
    this.isSidebarOpen = false;
  },
  openSidebar(this: { isSidebarOpen: boolean }): void {
    this.isSidebarOpen = true;
  },
};

const actions = {};

export const useAppStore = defineStore('app', {
  state,
  getters,
  actions: {
    ...actions,
    ...mutations,
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['queryParams', 'theme', 'responsiveDataListRows', 'navbar'],
  },
});
