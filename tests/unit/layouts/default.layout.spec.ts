import DefaultLayout from '@/app/layouts/default.vue';
import { headerUnitPage } from '@/tests/unit/support/components/layout/header.page.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import { useAppStore } from '@store/modules/app.ts';
import { useThemeStore } from '@store/modules/theme.ts';
import { userEvent } from '@testing-library/user-event';
import type { RenderResult } from '@testing-library/vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { THEME } from '~/assets/constants';

const renderDefaultLayout = (options = {}): Promise<RenderResult> =>
  renderAndInitializeStore(DefaultLayout, options);
describe('Default Layout', (): void => {
  describe('App header - Integration Tests', (): void => {
    afterEach((): void => {
      vi.clearAllMocks();
    });

    test('Clicking light bulb icon (Theme Switcher), toggles the theme state', async (): Promise<void> => {
      await renderDefaultLayout();

      const themeStore = useThemeStore();
      const themeTogglerSpy = vi.spyOn(themeStore, 'toggleTheme');

      // initial
      expect(themeStore.themeState).toBe(THEME.LIGHT);

      expect(headerUnitPage.themeSwitcherButton).toBeInTheDocument();
      await userEvent.click(headerUnitPage.themeSwitcherButton);

      expect(themeStore.themeState).toBe(THEME.DARK);

      // bonus
      expect(themeTogglerSpy).toHaveBeenCalledOnce();
    });

    test('Clicking the hamburger icon (Sidebar toggler), toggles the sidebar state in the app store', async (): Promise<void> => {
      await renderDefaultLayout();

      const appStore = useAppStore();
      const setSideBarSpy = vi.spyOn(appStore, 'toggleSidebar');

      expect(appStore.sideBarState).toBe(false);

      expect(headerUnitPage.sidebarToggler).toBeInTheDocument();
      await userEvent.click(headerUnitPage.sidebarToggler);

      expect(appStore.sideBarState).toBe(true);

      // bonus
      expect(setSideBarSpy).toHaveBeenCalledOnce();
    });
  });
});
