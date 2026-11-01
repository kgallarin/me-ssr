<script setup lang="ts">
  import type { PageTextContent } from '@/types/PageTextContent.ts';
  import ScrollReveal from '@components/motion/ScrollReveal.vue';
  import SkillChart from '@partials/about/SkillChart.vue';

  withDefaults(
    defineProps<{
      content: PageTextContent | null;
      animateOnce?: boolean;
      animationOnlyScrollDown?: boolean;
    }>(),
    {
      animateOnce: false,
      animationOnlyScrollDown: false,
    },
  );
</script>

<template>
  <section class="skills-chart shadow-bottom bg-secondary shadow-custom-mid-inset">
    <base-container class="px-0 py-12 pb-20 md:px-4 md:py-24 md:pb-24">
      <div class="w-full text-right">
        <scroll-reveal
          direction="right"
          :animate-once="animateOnce"
          :animate-only-scroll-down="animationOnlyScrollDown"
        >
          <h2 class="font-proxima text-4xl font-light">{{ content?.title }}</h2>
          <p class="font-acumin text-xs font-light">
            {{ content?.subtitle }}
          </p>
        </scroll-reveal>

        <scroll-reveal
          direction="up"
          :delay="0.2"
          :animate-once="animateOnce"
          :animate-only-scroll-down="animationOnlyScrollDown"
        >
          <div class="w-full">
            <skill-chart
              :animate-once="animateOnce"
              :animate-only-scroll-down="animationOnlyScrollDown"
            />
          </div>
        </scroll-reveal>
      </div>
    </base-container>
  </section>
</template>
