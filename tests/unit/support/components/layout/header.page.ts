import { AbstractUnitPageObject } from '@/tests/unit/support/page.base.ts';

export class HeaderUnitPage extends AbstractUnitPageObject {
  get headerParent(): HTMLElement {
    return this.getByTestId('base-header-nav');
  }

  get headerNavLinks(): HTMLElement[] {
    return this.getAllByTestId('header-nav-link');
  }

  get themeSwitcherButton(): HTMLElement {
    return this.getByTestId('theme-switcher');
  }

  get sidebarToggler(): HTMLElement {
    return this.getByTestId('sidebar-toggler');
  }

  public getHeaderNavLinkByIndex(index: number): HTMLElement {
    const link = this.headerNavLinks[index];
    if (!link) throw new Error(`Header nav link at index ${index} not found`);

    return link;
  }
}

export const headerUnitPage = new HeaderUnitPage();
