<script setup lang="ts">
  import ChartedSkills from '@partials/about/ChartedSkills.vue';
  import GraphedSkills from '@partials/about/GraphedSkills.vue';
  import RandomFacts from '@partials/about/RandomFacts.vue';
  import Recommendations from '@partials/about/Recommendations.vue';
  import Whoami from '@partials/about/Whoami.vue';
  import { useRecommendations } from '~/composables/recommendations/useRecommendations.ts';

  const { fetchContentSingle } = useFetchContent();

  const whoamiFetch = fetchContentSingle('whoami');
  const whoamiContents = computed(() => whoamiFetch.item?.value);

  const chartedSkillsFetch = fetchContentSingle('charted_skills');
  const chartedSkillsContent = computed(() => chartedSkillsFetch.item?.value);

  const randomFactsFetch = fetchContentSingle('random_facts');
  const randomFactsContent = computed(() => randomFactsFetch.item?.value);

  const graphedSkillsFetch = fetchContentSingle('graphed_skills');
  const graphedSkillsContent = computed(() => graphedSkillsFetch.item?.value);

  const recommendationFetch = fetchContentSingle('recommendations');
  const recommendationsContent = computed(() => recommendationFetch.item?.value);

  const { testimonials } = useRecommendations();
</script>

<template>
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
</template>
