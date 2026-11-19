import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Partially mock motion-v to ensure 'motion' and any components exist for components like ScalesOnPress
vi.mock('motion-v', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion-v')>();
  return {
    ...actual,
    // Ensure 'motion' object is present with proxy/stubs for tags like motion.div
    motion: new Proxy(
      {},
      {
        get: (
          _: {},
          prop: string | symbol,
        ): {
          name: string;
          render: () => null;
        } => {
          // Return a stubbed motion Vue component that wraps slotted content and inherits attributes
          return {
            name: `motion-${String(prop)}`,
            render() {
              const instance = getCurrentInstance();
              const slots = instance?.slots?.default
                ? instance.slots.default()
                : null;
              return h('div', { ...instance?.attrs }, slots as never) as never;
            },
          };
        },
      },
    ),
  };
});

// Suppress happy-dom animation abort errors globally
window.addEventListener(
  'unhandledrejection',
  (event: PromiseRejectionEvent): void => {
    if (
      event.reason?.name === 'AbortError' ||
      event.reason?.message?.includes('animation was canceled')
    ) {
      event.preventDefault();
    }
  },
);
