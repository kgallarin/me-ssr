<script setup lang="ts">
  import type { Image } from '@/types/App.ts';
  import BaseImage from '@components/base/BaseImage.vue';
  import ScrollReveal from '@components/motion/ScrollReveal.vue';

  withDefaults(
    defineProps<{
      title?: string;
      text?: string | { title?: string; text: string }[];
      image?: Image | null;
    }>(),
    {
      title: '',
      text: '',
      image: null,
    },
  );
</script>

<template>
  <section class="bg-gray-lighter">
    <base-container>
      <div
        class="flex w-full flex-col items-center justify-between py-6 md:flex-row-reverse md:py-8 lg:py-16"
      >
        <div class="w-full text-balance pt-8 text-primary md:w-5/12">
          <scroll-reveal
            direction="left"
            :animate-once="true"
            :animate-only-scroll-down="true"
          >
            <h1
              class="mb-4 text-4xl capitalize tracking-tight text-tertiary md:text-4xl xl:text-6xl"
            >
              {{ title }}
            </h1>

            <div class="font-proxima text-base font-light">
              <template v-if="Array.isArray(text)">
                <div v-for="(section, index) in text" :key="index" class="mb-4">
                  <h2 v-if="section.title" class="mb-2 text-2xl font-semibold">
                    {{ section.title }}
                  </h2>
                  <p class="leading-loose">
                    <base-safe-html :html="section.text" />
                  </p>
                </div>
              </template>
              <p v-else class="leading-loose">
                <base-safe-html :html="text" />
              </p>
            </div>
          </scroll-reveal>
        </div>
        <div class="w-full pt-8 md:w-1/2">
          <scroll-reveal
            direction="right"
            :animate-once="true"
            :animate-only-scroll-down="true"
          >
            <base-image
              class="object-cover shadow-lg"
              rounded="rounded-md"
              :src="image?.url ?? ''"
              :alt="image?.alt ?? ''"
            />
          </scroll-reveal>
        </div>
      </div>
    </base-container>
  </section>
</template>
