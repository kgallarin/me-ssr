import { computed, onUnmounted, ref } from 'vue';

import type { UseLiveTimeOptions } from '@/types/App.ts';

export function useLiveTime(options: UseLiveTimeOptions = {}) {
  const { timeZone = 'Asia/Singapore', locale = 'en-GB' } = options;

  const dateNow = ref(new Date());

  const yearNow = computed(() => dateNow.value.getFullYear());

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const timeNow = computed(() => timeFormatter.format(dateNow.value));

  let liveTimer: NodeJS.Timeout | null = null;

  liveTimer = setInterval(() => {
    dateNow.value = new Date();
  }, 1000);

  onUnmounted(() => {
    if (liveTimer) {
      clearInterval(liveTimer);
    }
  });

  return {
    dateNow,
    yearNow,
    timeNow,
  };
}
