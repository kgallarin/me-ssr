<script setup lang="ts">
  import type { Project } from '@/types/Projects.ts';
  import BaseSplideSlide from '@components/base/BaseSplideSlide.vue';
  import BaseSplider from '@components/base/BaseSplider.vue';
  import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';

  defineProps<{
    projects?: (Project | null | undefined)[];
  }>();
</script>

<template>
  <base-container
    class="tall:lg:max-w-screen-md pb-24 lg:pb-16 lg:pt-6 xl:max-w-7xl"
  >
    <div
      data-testid="projects-headers"
      class="headings font-lighter relative my-8 mt-10 border-t border-secondary text-center text-sm uppercase text-primary lg:mb-14 lg:mt-8"
    >
      <h3
        class="font-xl relative mx-auto -mt-2.5 max-w-fit bg-gray-lighter px-12 font-proxima text-lg font-light"
      >
        selected projects
      </h3>
    </div>

    <base-splider
      :items-to-show="3"
      :show-indicators="false"
      :show-arrows="false"
      :gap="3"
      :interval="8000"
      rewind
      autoplay
      :drag="true"
      :breakpoints="{
        1280: { perPage: 3 },
        1024: { perPage: 3 },
        768: { perPage: 2 },
        640: { perPage: 1 },
        '(min-height: 900px) and (min-width: 1024px)': { perPage: 2 },
      }"
    >
      <base-splide-slide
        v-for="project in projects"
        :key="project?.title"
        class="px-2 pb-12"
      >
        <div
          data-testid="project-card"
          class="card relative flex h-full flex-col rounded-md p-1 shadow-md bg-card-bg shadow-white/5"
        >
          <base-splider
            :items="project?.images.map((img) => img.url)"
            aspect-ratio="max-h-[215px] min-h-[215px]"
            :autoplay="project?.carouselSettings?.autoplay"
            :show-indicators="project?.carouselSettings?.showIndicators"
            :show-arrows="project?.carouselSettings?.showArrows"
            :items-to-show="1"
            :drag="false"
          />
          <!-- @todo: project card? -->
          <div class="relative p-4 text-primary bg-card-bg shadow-white/5">
            <h2 class="mb-2 font-proxima text-lg font-medium text-primary">
              {{ project?.title }}
              <fa-icon
                v-if="project?.order === 1"
                :icon="['fab', 'github']"
                class="text-card-text"
              />
            </h2>
            <p class="inline font-acumin text-xs font-light">
              {{ project?.description }}
            </p>
            <a
              v-if="project?.link"
              :href="project?.link"
              target="_blank"
              class="inline-block pl-1 font-acumin text-xs font-light text-blue-400 underline"
            >
              link
            </a>
          </div>

          <div class="mt-auto grid grid-cols-8 gap-1 p-4">
            <fa-icon
              v-for="(ico, index) in project?.icon"
              :key="index"
              data-testid="project-icon"
              :icon="ico?.icon"
              :style="{ color: ico?.color }"
              class="text-xl"
            />
          </div>
        </div>
      </base-splide-slide>
    </base-splider>
  </base-container>
</template>

<style>
  .svg-inline--fa {
    fill: currentColor;
  }
</style>
