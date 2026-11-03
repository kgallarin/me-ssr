<script setup lang="ts">
  import type { PageTextContent } from '@/types/PageTextContent.ts';
  import ChartedSkills from '@partials/about/ChartedSkills.vue';
  import GraphedSkills from '@partials/about/GraphedSkills.vue';
  import RandomFacts from '@partials/about/RandomFacts.vue';
  import Recommendations from '@partials/about/Recommendations.vue';
  import Whoami from '@partials/about/Whoami.vue';
  import { useRecommendations } from '~/composables/recommendations/useRecommendations.ts';

  const { fetchContentManyByKeys } = useFetchContent();

  const { items: contents } = fetchContentManyByKeys([
    'whoami',
    'charted_skills',
    'random_facts',
    'graphed_skills',
    'recommendations',
  ]);

  function getContentsByKey(key: string): PageTextContent | null {
    return contents.value?.find((content) => content.key === key) ?? null;
  }

  const whoamiContents = computed(() => getContentsByKey('whoami'));
  const chartedSkillsContent = computed(() => getContentsByKey('charted_skills'));
  const randomFactsContent = computed(() => getContentsByKey('random_facts'));
  const graphedSkillsContent = computed(() => getContentsByKey('graphed_skills'));
  const recommendationsContent = computed(() => getContentsByKey('recommendations'));

  const { testimonials } = useRecommendations();
</script>

<template>
  <div class="bg-base-container">
    <whoami :content="whoamiContents" animate-once animation-only-scroll-down />

    <charted-skills
      :content="chartedSkillsContent"
      animate-once
      animation-only-scroll-down
    />

    <random-facts
      :content="randomFactsContent"
      animate-once
      animation-only-scroll-down
    />

    <graphed-skills
      :content="graphedSkillsContent"
      animate-once
      animation-only-scroll-down
    />

    <recommendations
      :content="recommendationsContent"
      :testimonials="testimonials"
      :app-theme="'light'"
      animate-once
      animation-only-scroll-down
    />
  </div>
</template>
