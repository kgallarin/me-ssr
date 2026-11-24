import { AbstractUnitPageObject } from '@/tests/unit/support/page.base.ts';
import { within } from '@testing-library/vue';

export class FooterUnitPage extends AbstractUnitPageObject {
  get footerMain(): HTMLElement {
    return this.getByTestId('footer-main');
  }

  get timeNow(): HTMLElement {
    return this.getByTestId('time-now');
  }

  get yearNow(): HTMLElement {
    return this.getByTestId('year-now');
  }

  get topScroller(): HTMLElement {
    return this.getByTestId('top-scroller');
  }

  get footerNavLinks(): HTMLElement[] {
    return this.getAllByTestId('footer-nav-link');
  }

  get themeSwitcherButton(): HTMLElement[] {
    return within(this.footerMain).getAllByTestId('theme-switcher');
  }

  public getThemeSwitcherButtonByIndex(index: number): HTMLElement {
    const themeSwitcher = this.themeSwitcherButton[index];
    if (!themeSwitcher)
      throw new Error(`theme switcher at index ${index} not found`);

    return themeSwitcher;
  }

  public getFooterNavLinkByIndex(index: number): HTMLElement {
    const link = this.footerNavLinks[index];
    if (!link) throw new Error(`footer nav link at index ${index} not found`);

    return link;
  }
}

export const footerUnitPage = new FooterUnitPage();
