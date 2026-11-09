import {
  type ComponentPublicInstance,
  type MaybeRefOrGetter,
  computed,
  toRef,
} from 'vue';

import { useScroll } from '@vueuse/core';
import { useRoute } from 'vue-router';

const PAGE_ORDER = ['home', 'about', 'me', 'contact'];

interface UsePagePaginationNavOptions {
  targetRef?: MaybeRefOrGetter<
    ComponentPublicInstance | HTMLElement | null | undefined
  >;
  scrollThreshold?: number; // Distance scrolled before showing (default 500px)
}

export function usePagePaginationNavOnScroll(
  options: UsePagePaginationNavOptions = {},
) {
  const { scrollThreshold = 500 } = options;
  const route = useRoute();
  const { y: verticalScrollPosition } = useScroll(
    import.meta.client ? window : null,
  );

  const showNavigators = computed((): boolean => {
    if (!import.meta.client) return false; // guard

    const targetEl = toRef(options.targetRef).value;

    // extract dom
    const element = (targetEl as ComponentPublicInstance)?.$el ?? targetEl;

    const elementTop = element?.offsetTop ?? Infinity;
    const isElementVisible =
      verticalScrollPosition.value + window.innerHeight >= elementTop;
    const currentRouteName = String(route.name);

    return (
      verticalScrollPosition.value > scrollThreshold &&
      !isElementVisible &&
      currentRouteName !== 'home'
    );
  });

  const currentIndex = computed((): number =>
    PAGE_ORDER.indexOf(String(route.name)),
  );

  const prevPage = computed((): string | null | undefined =>
    currentIndex.value > 0 ? PAGE_ORDER[currentIndex.value - 1] : null,
  );

  const nextPage = computed((): string | null | undefined =>
    currentIndex.value !== -1 && currentIndex.value < PAGE_ORDER.length - 1
      ? PAGE_ORDER[currentIndex.value + 1]
      : null,
  );

  return {
    showNavigators,
    prevPage,
    nextPage,
  };
}
