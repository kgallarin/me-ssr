import { headerUnitPage } from '@/tests/unit/support/components/layout/header.page.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import Header from '~~/app/components/layout/Header.vue';

const renderAppHeader = (options = {}): Promise<RenderResult> =>
  renderAndInitializeStore(Header, options);

describe('App header - Unit Test Suite', (): void => {
  test('Renders the base header container', async (): Promise<void> => {
    await renderAppHeader({
      props: {},
    });
    expect(headerUnitPage.headerParent).toBeInTheDocument();
  });

  test('Theme switcher emits "toggleTheme" when clicked', async (): Promise<void> => {
    const { emitted } = await renderAppHeader({
      props: {},
    });
    expect(headerUnitPage.themeSwitcherButton).toBeInTheDocument();
    await userEvent.click(headerUnitPage.themeSwitcherButton);

    expect(emitted()).toHaveProperty('toggleTheme');
  });

  test('Bar icon emits "openSidebar" when clicked', async (): Promise<void> => {
    const { emitted } = await renderAppHeader({
      props: {},
    });

    expect(headerUnitPage.sidebarToggler).toBeInTheDocument();

    await userEvent.click(headerUnitPage.sidebarToggler);
    expect(emitted()).toHaveProperty('openSidebar');
  });

  test('Given links have a correct href attribute', async (): Promise<void> => {
    const navLinks = [
      {
        label: 'test',
        to: '/',
        icon: 'test-icon',
      },
      {
        label: 'test label',
        to: '/about',
        icon: 'another-test-icon',
      },
    ];

    await renderAppHeader({
      props: {
        nav: navLinks,
      },
    });

    expect(headerUnitPage.headerNavLinks).toHaveLength(2);

    expect(headerUnitPage.getHeaderNavLinkByIndex(0)).toHaveAttribute('href', '/');

    expect(headerUnitPage.getHeaderNavLinkByIndex(1)).toHaveAttribute(
      'href',
      '/about',
    );
  });
});
