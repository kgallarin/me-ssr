export abstract class AbstractMockHelper {
  protected mockGet<T>(
    url: string,
    body: T,
    statusCode: number,
    alias: string,
  ): void {
    cy.intercept('GET', url, {
      statusCode,
      body,
      headers: {
        'access-control-allow-origin': '*', // Prevents "Not allowed" CORS errors
      },
    }).as(alias);
  }

  protected arrangeUrlQuery(
    params: Record<string, string> | URLSearchParams = {},
  ): string {
    return params instanceof URLSearchParams
      ? params.toString()
      : new URLSearchParams(params).toString();
  }
}
