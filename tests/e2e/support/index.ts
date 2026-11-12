type GetOptions = Partial<
  Cypress.Timeoutable & Cypress.Loggable & Cypress.Withinable & Cypress.Shadow
>;

declare global {
  namespace Cypress {
    // any: global library extension

    interface Chainable {
      // custom command for selecting dom attr
      getBySel(dataCyValue: string, options?: GetOptions): Chainable;

      // intercept storefront graphql by operation name
      mockGraphqlApi(operationName: string, fixturePath: string): Chainable;
    }
  }
}

export {};
