import { screen } from '@testing-library/vue';

export abstract class AbstractUnitPageObject {
  protected getByTestId(selector: string): HTMLElement {
    return screen.getByTestId(selector);
  }

  protected queryBySelector(selector: string): HTMLElement | null {
    return screen.queryByTestId(selector);
  }

  protected getAllByTestId(selector: string) {
    return screen.queryAllByTestId(selector);
  }
}
