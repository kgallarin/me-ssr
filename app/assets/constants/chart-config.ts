import { useAppStore } from '@store/modules/app.ts';
import { type ChartData, type ChartOptions } from 'chart.js';
import { type Context } from 'chartjs-plugin-datalabels';

export const getChartData = (): ChartData<'bar'> => ({
  labels: [
    ['Vue', '88%'],
    ['Forms', '85%'],
    ['JS/TypeScript', '79%'],
    ['App State', '82%'],
    ['Animation', '78%'],
    ['Rest/GraphQL', '60%'],
  ],
  datasets: [
    {
      backgroundColor: (context: {
        chart: {
          ctx: CanvasRenderingContext2D;
          chartArea: { top: number; bottom: number };
        };
        dataIndex: number;
      }) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) return '#21d4fd';

        const index = context.dataIndex;
        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top,
        );

        switch (index) {
          case 0:
            gradient.addColorStop(0, '#336d80');
            gradient.addColorStop(1, '#9BDCE8FF');
            break;
          case 1:
            gradient.addColorStop(0, '#996a5b');
            gradient.addColorStop(1, '#D0A78CFF');
            break;
          case 2:
            gradient.addColorStop(0, '#e7af30');
            gradient.addColorStop(1, '#dec691');
            break;
          case 3:
            gradient.addColorStop(0, '#43A677FF');
            gradient.addColorStop(1, '#84CCA9FF');
            break;
          case 4:
            gradient.addColorStop(0, '#333333');
            gradient.addColorStop(1, '#fff');
            break;
          case 5:
            gradient.addColorStop(0, '#e14949');
            gradient.addColorStop(1, '#fff');
            break;

          default:
            return gradient;
        }

        return gradient;
      },
      data: [88, 85, 79, 82, 78, 70],
      borderRadius: 4,
      barPercentage: 0.96,
      categoryPercentage: 0.96,
    },
  ],
});

export const getChartOptions = (): ChartOptions<'bar'> & {
  plugins: { datalabels?: unknown };
} => {
  // @todo: theme
  const appStore = useAppStore();
  // const appStore = 'light';
  // const theme = appStore === 1 ? 'dark' : 'light';
  type ThemeOptions = 'light' | 'dark';
  const theme: ThemeOptions = 'light';
  return {
    indexAxis: 'x' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: '#fff',
        offset: 0,
        rotation: 0,
        clip: false,
        clamp: true,
        textAlign: 'center' as const,
        labels: {
          title: {
            display: true,
            font: {
              family: 'Acumin Pro Wide, sans-serif',
              size: appStore.queryBreakpoints(16, 12, 6, 11),
              weight: 'lighter' as const,
              lineHeight: 'normal',
            },
            color: '#fff',
            formatter: (_value: number, context: Context): string => {
              const label = context.chart.data.labels?.[context.dataIndex];
              return Array.isArray(label) ? (label[0] as string) : (label as string);
            },
            clamp: true,
            anchor: 'start' as const,
            align: 'end' as const,
            offset: appStore.queryBreakpoints(30, 25, 4, 5),
          },
          subtitle: {
            display: true,
            font: {
              family: 'Proxima Nova, sans-serif, Helvetica Neue, Helvetica, Arial',
              size: appStore.queryBreakpoints(42, 32, 18, 24),
              weight: 600,
              lineHeight: 1.2,
            },
            color: '#fff',
            clamp: true,
            anchor: 'start' as const,
            align: 'end' as const,
            offset: appStore.queryBreakpoints(48, 40, 15, 20), // Adjust this offset to position it below the title
            formatter: (_value: number, context: Context) => {
              const label = context.chart.data.labels?.[context.dataIndex];
              return Array.isArray(label) ? (label[1] as string) : '';
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,

          color: theme !== 'light' ? '#ffffff' : '#E5E4E2FF',
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: true,
        max: 100,
        min: 40,
        grid: {
          display: true,
        },
        border: {
          display: true,
          color: theme !== 'light' ? '#ffffff' : '#E5E4E2FF',
        },
        ticks: {
          display: appStore.isDesktop,
          padding: appStore.queryBreakpoints(14, 14, 5),
          font: {
            family: 'Proxima Nova, sans-serif, Helvetica Neue, Helvetica, Arial',
            size: appStore.queryBreakpoints(14, 14, 9),
          },
          color: theme !== 'light' ? '#ffffff' : '#010303FF',
          callback: (value: string | number): string => {
            if (value === 100) return 'Seer';
            if (value === 80) return 'Magician';
            if (value === 60) return 'Geek';
            if (value === 40) return 'Caveman';
            return '';
          },
          stepSize: 20,
        },
      },
    },
  };
};
