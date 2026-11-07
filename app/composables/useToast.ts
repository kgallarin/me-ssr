import { computed, onUnmounted, ref, toValue, watch } from 'vue';

import type { ToastPosition, UseToastOptions } from '@/types/App.ts';
import { BASE_TOAST_RIGHT_POS, BASE_TOAST_TOP_POS } from '~/assets/constants';

const TOP_POSITIONS = new Set<ToastPosition>(BASE_TOAST_TOP_POS);
const RIGHT_POSITIONS = new Set<ToastPosition>(BASE_TOAST_RIGHT_POS);

export function useToast(options: UseToastOptions) {
  const isVisible = ref(false);
  let delayTimer: ReturnType<typeof setTimeout> | undefined;

  watch(
    () => toValue(options.show),
    (val) => {
      clearTimeout(delayTimer);
      const delay = toValue(options.showDelay) ?? 0;
      if (val && delay > 0) {
        delayTimer = setTimeout(() => (isVisible.value = true), delay);
      } else {
        isVisible.value = val;
      }
    },
    { immediate: true },
  );

  onUnmounted(() => clearTimeout(delayTimer));

  const isTop = computed(() =>
    TOP_POSITIONS.has(toValue(options.position) ?? 'top-right'),
  );
  const isRight = computed(() =>
    RIGHT_POSITIONS.has(toValue(options.position) ?? 'top-right'),
  );

  const positionStyle = computed(() => {
    const idx = toValue(options.index) ?? 0;
    const offsetVal = toValue(options.toastOffset) ?? 0;
    const offset = idx * offsetVal;

    return isTop.value
      ? { top: `${80 + offset}px` }
      : { bottom: `${40 + offset}px` };
  });

  const sideClasses = computed(() =>
    isRight.value ? 'right-1 sm:right-2 md:right-4' : 'left-1 sm:left-2 md:left-4',
  );

  const motionProps = computed(() => {
    const x = isRight.value ? '100%' : '-100%';
    return {
      initial: { opacity: 0, x },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x },
    };
  });

  const close = () => {
    options.onClose?.();
  };

  return {
    isVisible,
    positionStyle,
    sideClasses,
    motionProps,
    close,
  };
}
