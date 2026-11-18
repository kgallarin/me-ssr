import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import { describe, expect, test } from 'vitest';
import Header from '~~/app/components/layout/Header.vue';

const renderAppHeader = (options = {}) => renderAndInitializeStore(Header, options);

describe('App header - Unit Test Suite', (): void => {
  test('it works', async (): Promise<void> => {
    const { getByTestId } = await renderAppHeader({
      props: {},
    });

    expect(getByTestId('base-header-nav'));
  });
});
