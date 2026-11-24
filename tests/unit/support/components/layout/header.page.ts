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
    const link = this.headerNavLinks[index];
    if (!link) throw new Error(`Header nav link at index ${index} not found`);

    return link;
  }

  get headerIconLink(): HTMLElement[] {
    return this.getAllByTestId('icon-link');
  }

  public getHeaderIconLinksByIndex(index: number): HTMLElement {
    const iconLink = this.headerIconLink[index];
    if (!iconLink) throw new Error(`Icon link at index ${index} not found`);

    return iconLink;
  }
}

export const headerUnitPage = new HeaderUnitPage();
