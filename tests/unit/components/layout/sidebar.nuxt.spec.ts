import { createIconLinks } from '@/tests/factories/icon.links.factory.ts';
import { createNavLinks } from '@/tests/factories/nav.links.factory.ts';
import { sidebarUnitPage } from '@/tests/unit/support/components/layout/sidebar.page.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import type { IconLink } from '@/types/Icons.ts';
import Sidebar from '@components/layout/Sidebar.vue';
import { userEvent } from '@testing-library/user-event/dist/cjs/index.js';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderSidebar = (options = {}): Promise<RenderResult> =>
  renderAndInitializeStore(Sidebar, options);
describe('App sidebar - Unit Test Suite', (): void => {
  test('Renders the base sidebar container', async (): Promise<void> => {
    await renderSidebar({
      props: {},
    });
    expect(sidebarUnitPage.sidebarMain).toBeInTheDocument();
  });

  test('Theme switcher emits "toggle-theme" when clicked', async (): Promise<void> => {
    const iconLinks = createIconLinks(2) as IconLink[];
    const options = {
      global: {
        stubs: {
          StaggeringVerticalNav: false,
          ScalesOnPress: false,
        },
      },
      props: {
        iconLinks,
      },
    };
    const { emitted } = await renderSidebar(options);

    expect(sidebarUnitPage.themeToggler).toBeInTheDocument();
    await userEvent.click(sidebarUnitPage.themeToggler);

    expect(emitted()).toHaveProperty('toggle-theme');
  });

  test('Given sidebar links have a correct href attribute', async (): Promise<void> => {
    const navLinks = createNavLinks(2);

    await renderSidebar({
      props: {
        nav: navLinks,
      },
    });

    expect(sidebarUnitPage.sidebarNavLinks).toHaveLength(2);

    expect(sidebarUnitPage.getSidebarNavLinkByIndex(0)).toHaveAttribute(
      'href',
      navLinks[0]?.to,
    );

    expect(sidebarUnitPage.getSidebarNavLinkByIndex(1)).toHaveAttribute(
      'href',
      navLinks[1]?.to,
    );
  });

  test('Clicking sidebar link(s) also emits "close-sidebar" ', async (): Promise<void> => {
    const navLinks = createNavLinks(2);

    const { emitted } = await renderSidebar({
      props: {
        nav: navLinks,
      },
    });

    expect(sidebarUnitPage.sidebarNavLinks).toHaveLength(2);

    expect(sidebarUnitPage.getSidebarNavLinkByIndex(0)).toHaveAttribute(
      'href',
      navLinks[0]?.to,
    );

    await userEvent.click(sidebarUnitPage.getSidebarNavLinkByIndex(0));

    expect(emitted()).toHaveProperty('close-sidebar');
  });
});
