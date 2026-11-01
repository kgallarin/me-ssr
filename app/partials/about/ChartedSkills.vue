<script setup lang="ts">
  import type { PageTextContent } from '@/types/PageTextContent.ts';
  import ScrollReveal from '@components/motion/ScrollReveal.vue';

  const props = withDefaults(
    defineProps<{
      content: PageTextContent | null;
      animateOnce?: boolean;
      animationOnlyScrollDown?: boolean;
      noAnimation?: boolean;
    }>(),
    {
      animateOnce: false,
      animationOnlyScrollDown: false,
      noAnimation: false,
    },
  );

  const chartImage = computed(() => props.content?.heroImages?.[0]);
  const perceptiveSide = computed(() => props.content?.content[0]);
  const developerSide = computed(() => props.content?.content[1]);
</script>

<template>
  <section
    data-testid="charted-skills"
    class="shadow-bottom bg-secondary shadow-custom-mid-inset"
  >
    <base-container class="py-16 md:py-32">
      <div
        class="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-0"
      >
        <div class="text-center md:text-left">
          <scroll-reveal
            direction="right"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
            :no-animation="noAnimation"
          >
            <h3 class="mb-5 font-proxima text-3xl font-light">
              {{ perceptiveSide?.title }}
            </h3>
            <p class="font-proxima font-light leading-snug text-tertiary">
              <base-safe-html :html="perceptiveSide?.text" />
            </p>
          </scroll-reveal>
        </div>

        <scroll-reveal
          direction="up"
          :delay="0.2"
          :animate-once="animateOnce"
          :animate-only-scroll-down="animationOnlyScrollDown"
          :no-animation="noAnimation"
        >
          <base-image
            class="h-full w-full object-cover sm:h-[340px] sm:w-[340px]"
            :src="chartImage?.url ?? ''"
            alt="kgallarin chart"
            rounded="rounded-full"
          />
        </scroll-reveal>

        <div class="w-full text-center md:w-auto md:text-right">
          <scroll-reveal
            direction="left"
            :animate-once="animateOnce"
            :animate-only-scroll-down="animationOnlyScrollDown"
            :no-animation="noAnimation"
          >
            <h3 class="mb-5 font-proxima text-3xl font-light">
              {{ developerSide?.title }}
            </h3>

            <p class="text-tertiar font-proxima font-light leading-snug">
              <base-safe-html :html="developerSide?.text" />
            </p>
          </scroll-reveal>
        </div>
      </div>
    </base-container>
  </section>
</template>
