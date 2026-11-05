<script setup lang="ts">
  import { computed } from 'vue';

  import type { AppTheme } from '@/types/App.ts';
  import type { PageTextContent } from '@/types/PageTextContent.ts';
  import type { Testimonial } from '@/types/Recommendations.ts';
  import ScrollReveal from '@components/motion/ScrollReveal.vue';
  import RecommendationCard from '@components/recommendations/RecommendationCard.vue';

  const props = withDefaults(
    defineProps<{
      content?: PageTextContent | null;
      testimonials: (Testimonial | null | undefined)[];
      animateOnce?: boolean;
      animationOnlyScrollDown?: boolean;
      theme: AppTheme;
    }>(),
    {
      content: null,
      animateOnce: false,
      animationOnlyScrollDown: false,
    },
  );

  const columnData = computed(() => {
    if (!props.testimonials) return { cols2: [[], []], cols3: [[], [], []] };

    const cols2: Testimonial[][] = [[], []];
    const cols3: Testimonial[][] = [[], [], []];
    props.testimonials
      .filter((rec): rec is Testimonial => rec !== null)
      .forEach((rec, index) => {
        cols2[index % 2]!.push(rec);
        cols3[index % 3]!.push(rec);
      });

    return { cols2, cols3 };
  });

  const getGlobalIndex = (
    columnIndex: number,
    rowIndex: number,
    totalColumns: number,
  ) => {
    return rowIndex * totalColumns + columnIndex;
  };
</script>

<template>
  <section ref="recommendations">
    <base-container class="pb-24">
      <scroll-reveal
        direction="up"
        :animate-once="animateOnce"
        :animate-only-scroll-down="animationOnlyScrollDown"
      >
        <h2 class="pt-24 font-proxima text-4xl font-light">{{ content?.title }}</h2>
        <p class="font-acumin text-xs font-light">{{ content?.subtitle }}</p>
      </scroll-reveal>

      <!-- Desktop (3 columns) -->
      <div class="hidden gap-6 pt-12 lg:flex">
        <div
          v-for="(column, colIndex) in columnData.cols3"
          :key="colIndex"
          class="flex flex-1 flex-col gap-6"
        >
          <scroll-reveal
            v-for="(recommendation, rowIndex) in column"
            :key="rowIndex"
            direction="up"
            :delay="getGlobalIndex(colIndex, rowIndex, 4) * 0.1"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
            class="break-inside-avoid"
          >
            <recommendation-card :testimonial="recommendation" :theme="theme" />
          </scroll-reveal>
        </div>
      </div>

      <!-- Tablet (2 columns) -->
      <div class="hidden gap-6 pt-12 md:flex lg:hidden">
        <div
          v-for="(column, colIndex) in columnData.cols2"
          :key="colIndex"
          class="flex flex-1 flex-col gap-6"
        >
          <scroll-reveal
            v-for="(recommendation, rowIndex) in column"
            :key="rowIndex"
            direction="up"
            :delay="getGlobalIndex(colIndex, rowIndex, 2) * 0.1"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
            class="break-inside-avoid"
          >
            <recommendation-card :testimonial="recommendation" :theme="theme" />
          </scroll-reveal>
        </div>
      </div>

      <!-- Mobile (1 column) -->
      <div class="flex flex-col gap-6 pt-12 md:hidden">
        <scroll-reveal
          v-for="(recommendation, index) in testimonials"
          :key="index"
          direction="up"
          :delay="index * 0.1"
          :animate-once="animateOnce"
          :animate-only-scroll-down="animationOnlyScrollDown"
          class="break-inside-avoid"
        >
          <recommendation-card :testimonial="recommendation" :theme="theme" />
        </scroll-reveal>
      </div>
    </base-container>
  </section>
</template>
