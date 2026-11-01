<script setup lang="ts">
  import {
    BarElement,
    CategoryScale,
    type ChartData,
    Chart as ChartJS,
    type ChartOptions,
    Legend,
    LinearScale,
    type Plugin,
    Title,
    Tooltip,
  } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar } from 'vue-chartjs';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels,
  );

  withDefaults(
    defineProps<{
      data?: ChartData<'bar', (number | [number, number] | null)[]>;
      options?: ChartOptions<'bar'>;
      plugins?: Plugin<'bar'>[];
    }>(),
    {
      data: () => ({
        labels: [],
        datasets: [],
      }),
      options: () => ({}),
      plugins: () => [],
    },
  );
</script>

<template>
  <bar :data="data" :options="options" :plugins="plugins" />
</template>
