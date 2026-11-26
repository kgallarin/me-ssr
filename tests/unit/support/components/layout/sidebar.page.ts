import { AbstractUnitPageObject } from '@/tests/unit/support/page.base.ts';
import { within } from '@testing-library/vue';

export class SidebarUnitPage extends AbstractUnitPageObject {
  get sidebarMain(): HTMLElement {
    return this.getByTestId('sidebar-main');
  }
  get themeToggler(): HTMLElement {
    return within(this.sidebarMain).getByTestId('theme-toggler');
  }

  get sidebarNavLinks(): HTMLElement[] {
    return within(this.sidebarMain).getAllByTestId('sidebar-nav-link');
  }

  public getSidebarNavLinkByIndex(index: number): HTMLElement {
    return this.getElementAtIndex(this.sidebarNavLinks, index, 'Sidebar Nav Links');
  }

  get sidebarIconLink(): HTMLElement[] {
    return within(this.sidebarMain).getAllByTestId('sidebar-icon-link');
  }
}

export const sidebarUnitPage = new SidebarUnitPage();
