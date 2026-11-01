<script setup lang="ts">
  import { computed } from 'vue';

  import { useAppStore } from '@store/modules/app.ts';
  import { getChartData, getChartOptions } from '~/assets/constants/chart-config.ts';

  const props = withDefaults(
    defineProps<{
      animateOnce?: boolean;
      animateOnlyScrollDown?: boolean;
    }>(),
    {
      animateOnce: true,
      animateOnlyScrollDown: false,
    },
  );

  const { target, isVisible, skipAnimation } = useScrollReveal({
    animateOnce: props.animateOnce,
    animateOnlyScrollDown: props.animateOnlyScrollDown,
    threshold: 0.1,
  });

  const chartData = computed(() => getChartData());

  const chartOptions = computed(() => {
    const options = getChartOptions();

    if (!isVisible.value || skipAnimation.value) {
      options.animation = false;
    }

    return options;
  });

  const appStore = useAppStore();
  const chartKey = computed(() =>
    appStore.isDesktop ? 'desktop-chart' : 'mobile-chart',
  );
</script>

<template>
  <div ref="target" class="w-full">
    <base-bar-chart
      v-if="isVisible"
      :key="chartKey"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
