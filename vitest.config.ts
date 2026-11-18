import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    reporters: ['default'],
    hideSkippedTests: false,
    setupFiles: ['./tests/unit/support/setup.ts'],

    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
  },
});
