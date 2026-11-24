import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    reporters: ['default'],
    hideSkippedTests: false,
    setupFiles: ['./tests/unit/support/setup.ts'],
    slowTestThreshold: 1000, //ms; default:300

    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
  },
});
