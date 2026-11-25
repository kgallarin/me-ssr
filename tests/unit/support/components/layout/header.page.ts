import { AbstractUnitPageObject } from '@/tests/unit/support/page.base.ts';
import { within } from '@testing-library/vue';

export class HeaderUnitPage extends AbstractUnitPageObject {
  get headerParent(): HTMLElement {
    return this.getByTestId('base-header-nav');
  }

  get headerLogo(): HTMLElement {
    return this.getByTestId('brand-logo');
  }

  get themeSwitcherButton(): HTMLElement {
    return within(this.headerParent).getByTestId('theme-switcher');
  }

  get sidebarToggler(): HTMLElement {
    return this.getByTestId('sidebar-toggler');
  }

  get headerNavLinks(): HTMLElement[] {
    return this.getAllByTestId('header-nav-link');
  }

  public getHeaderNavLinkByIndex(index: number): HTMLElement {
    return this.getElementAtIndex(this.headerNavLinks, index, 'Header Nav Link');
  }

  get headerIconLink(): HTMLElement[] {
    return this.getAllByTestId('icon-link');
  }

  public getHeaderIconLinksByIndex(index: number): HTMLElement {
    return this.getElementAtIndex(this.headerIconLink, index, 'Header Icon Link');
  }
}

export const headerUnitPage = new HeaderUnitPage();
