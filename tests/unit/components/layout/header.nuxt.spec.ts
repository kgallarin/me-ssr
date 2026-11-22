import { createIconLinks } from '@/tests/factories/icon.links.factory.ts';
import { createNavLinks } from '@/tests/factories/nav.links.factory.ts';
import { headerUnitPage } from '@/tests/unit/support/components/layout/header.page.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import type { IconLink } from '@/types/Icons.ts';
import { userEvent } from '@testing-library/user-event';
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

  test('Logo has the correct href attribute', async (): Promise<void> => {
    await renderAppHeader();

    expect(headerUnitPage.headerLogo).toHaveAttribute('href', '/');
  });

  test('Theme switcher emits "toggleTheme" when clicked', async (): Promise<void> => {
    const { emitted } = await renderAppHeader({
      props: {},
    });

    expect(headerUnitPage.themeSwitcherButton).toBeInTheDocument();
    await userEvent.click(headerUnitPage.themeSwitcherButton);

    expect(emitted()).toHaveProperty('toggleTheme');
  });

  test('Hamburger icon emits "openSidebar" when clicked', async (): Promise<void> => {
    const { emitted } = await renderAppHeader({
      props: {},
    });

    expect(headerUnitPage.sidebarToggler).toBeInTheDocument();

    await userEvent.click(headerUnitPage.sidebarToggler);
    expect(emitted()).toHaveProperty('openSidebar');
  });

  test('Given links have a correct href attribute', async (): Promise<void> => {
    const navLinks = createNavLinks(2);

    await renderAppHeader({
      props: {
        nav: navLinks,
      },
    });

    expect(headerUnitPage.headerNavLinks).toHaveLength(2);

    expect(headerUnitPage.getHeaderNavLinkByIndex(0)).toHaveAttribute(
      'href',
      navLinks[0]?.to,
    );

    expect(headerUnitPage.getHeaderNavLinkByIndex(1)).toHaveAttribute(
      'href',
      navLinks[1]?.to,
    );
  });

  test('Given Icon links have a correct href attribute', async (): Promise<void> => {
    const iconLinks = createIconLinks(2) as IconLink[];

    await renderAppHeader({
      props: {
        iconLinks: iconLinks,
      },
    });
    expect(headerUnitPage.headerIconLink).toHaveLength(2);
    expect(headerUnitPage.getHeaderIconLinksByIndex(0)).toHaveAttribute(
      'href',
      iconLinks[0]?.url,
    );
    expect(headerUnitPage.getHeaderIconLinksByIndex(1)).toHaveAttribute(
      'href',
      iconLinks[1]?.url,
    );
  });
});
