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
    return this.getElementAtIndex(
      this.themeSwitcherButton,
      index,
      'Theme Switcher Button',
    );
  }

  public getFooterNavLinkByIndex(index: number): HTMLElement {
    return this.getElementAtIndex(this.footerNavLinks, index, 'Footer Nav Link');
  }
}

export const footerUnitPage = new FooterUnitPage();
