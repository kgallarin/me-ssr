import { createNavLinks } from '@/tests/factories/nav.links.factory.ts';
import { footerUnitPage } from '@/tests/unit/support/components/layout/footer.page.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import { userEvent } from '@testing-library/user-event';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';
import Footer from '~~/app/components/layout/Footer.vue';

const renderAppFooter = (options = {}): Promise<RenderResult> =>
  renderAndInitializeStore(Footer, options);

describe('App footer - Unit Test Suite', (): void => {
  test('Footer main mounts properly', async (): Promise<void> => {
    await renderAppFooter();

    expect(footerUnitPage.footerMain).toBeInTheDocument();
  });

  test('Footer links have a correct href attribute', async (): Promise<void> => {
    const navLinks = createNavLinks(2);

    await renderAppFooter({
      props: {
        nav: navLinks,
      },
    });

    expect(footerUnitPage.footerNavLinks).toHaveLength(2);

    expect(footerUnitPage.getFooterNavLinkByIndex(0)).toHaveAttribute(
      'href',
      navLinks[0]?.to,
    );

    expect(footerUnitPage.getFooterNavLinkByIndex(1)).toHaveAttribute(
      'href',
      navLinks[1]?.to,
    );
  });

  test('Theme switcher emits "toggleTheme" when clicked', async (): Promise<void> => {
    const { emitted } = await renderAppFooter({
      props: {},
    });

    expect(footerUnitPage.getThemeSwitcherButtonByIndex(0)).toBeInTheDocument();
    await userEvent.click(footerUnitPage.getThemeSwitcherButtonByIndex(0));

    expect(emitted()).toHaveProperty('toggleTheme');
  });
});
