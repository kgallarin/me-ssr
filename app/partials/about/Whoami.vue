<script setup lang="ts">
  import type { PageTextContent } from '@/types/PageTextContent.ts';
  import BaseContainer from '@components/base/BaseContainer.vue';
  import BaseSplider from '@components/base/BaseSplider.vue';
  import ScrollReveal from '@components/motion/ScrollReveal.vue';
  import { useAppStore } from '@store/modules/app.ts';

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

  const appStore = useAppStore();
  const responsiveQueries = computed(() => appStore.queryBreakpoints(8, 4, 2));
</script>

<template>
  <section class="custom-shadow-inner border-b border-secondary">
    <base-container>
      <div
        class="border-gray-primary/50 flex w-full flex-col items-center justify-between border-b py-6 md:flex-row md:py-8 lg:py-16"
      >
        <div class="w-full text-balance text-primary md:w-5/12">
          <scroll-reveal
            direction="right"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
          >
            <h1 class="mb-4 text-6xl lowercase tracking-tight text-tertiary">
              {{ content?.title }}
            </h1>
            <p class="mb-4 font-acumin text-xl font-light">
              <base-safe-html :html="content?.subtitle" />
            </p>
            <div v-for="(section, index) in content?.content" :key="index">
              <h2 v-if="section.title" class="mb-2 text-2xl font-semibold">
                {{ section.title }}
              </h2>
              <p class="font-proxima text-base font-light leading-loose">
                {{ section.text }}
              </p>
            </div>
          </scroll-reveal>
        </div>

        <div class="w-full justify-self-end pt-8 md:w-1/2">
          <scroll-reveal
            direction="left"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
          >
            <base-image
              class="min-h-[300px] object-cover shadow-lg"
              rounded="rounded-md"
              :src="content?.heroImages?.[0]?.url ?? ''"
              :alt="content?.heroImages?.[0]?.alt ?? ''"
            />
          </scroll-reveal>
        </div>
      </div>

      <!-- images -->
      <div class="image-gallery py-10">
        <scroll-reveal
          direction="up"
          :animate-once="animateOnce"
          :animate-only-scroll-down="animationOnlyScrollDown"
        >
          <base-splider
            :items="content?.socialImages"
            :autoplay="true"
            :interval="8000"
            :show-indicators="false"
            :show-arrows="false"
            :drag="true"
            :items-to-show="responsiveQueries"
            image-classes="rounded-md overflow-hidden"
            image-container-class="border border-gray-300 p-1"
            rounded="rounded-md"
            fixed-height="100px"
            object-fit="cover"
          />
        </scroll-reveal>
      </div>
    </base-container>
  </section>
</template>
