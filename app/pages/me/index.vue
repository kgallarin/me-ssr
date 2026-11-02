<script setup lang="ts">
  import { computed } from 'vue';

  import BaseSafeHtml from '@components/base/BaseSafeHtml.vue';
  import WhyFrontend from '@partials/story/WhyFrontend.vue';

  const { fetchContentSingle } = useFetchContent();

  const whyFrontendFetch = fetchContentSingle('how_me');
  const whyFrontendContent = computed(() => whyFrontendFetch.item?.value);

  const gistsContentFetch = fetchContentSingle('gists');
  const gistsContent = computed(() => gistsContentFetch.item?.value);

  const factsContentFetch = fetchContentSingle('personal_facts');
  const factsContent = computed(() => factsContentFetch.item?.value);

  const howIGotIntoFetch = fetchContentSingle('got_into_web_dev');
  const howIGotIntoContent = computed(() => howIGotIntoFetch.item?.value);

  const lessonsFetch = fetchContentSingle('lessons');
  const lessonsContent = computed(() => lessonsFetch.item?.value);
</script>

<template>
  <why-frontend
    :title="whyFrontendContent?.title"
    :text="whyFrontendContent?.content"
    :image="whyFrontendContent?.heroImages[0]"
  />
  <section class="shadow-bottom bg-gray-lighter shadow-custom-mid-inset">
    <base-container class="py-12 md:py-16">
      <div class="mx-auto max-w-screen-md border-b border-gray-200 pb-12">
        <h1 class="mb-6 text-4xl capitalize tracking-tight text-tertiary">
          {{ gistsContent?.title }}
        </h1>
        <p>
          <base-safe-html :html="gistsContent?.content[0]?.text" />
        </p>
      </div>

      <div class="mx-auto max-w-screen-md border-b border-gray-200 py-12">
        <h1 class="mb-6 text-4xl capitalize tracking-tight text-tertiary">
          {{ factsContent?.title }}
        </h1>

        <div
          v-for="(fact, index) in factsContent?.content"
          :key="index"
          class="mb-6"
        >
          <h2 class="mb-1 font-acumin font-semibold leading-tight">
            {{ fact.title }}
          </h2>
          <p>{{ fact.text }}</p>
        </div>
      </div>

      <div class="mx-auto max-w-screen-md border-b border-gray-200 py-12">
        <h1 class="mb-6 text-4xl capitalize tracking-tight text-tertiary">
          {{ howIGotIntoContent?.title }}
        </h1>

        <p>
          <base-safe-html :html="howIGotIntoContent?.content[0]?.text" />
        </p>
      </div>

      <div class="mx-auto max-w-screen-md py-12">
        <h1 class="mb-12 text-4xl capitalize tracking-tight text-tertiary">
          {{ lessonsContent?.title }}
        </h1>

        <div
          v-for="(lesson, index) in lessonsContent?.content"
          :key="index"
          class="mb-12"
        >
          <h2 class="mb-4 font-acumin font-semibold leading-tight">
            {{ lesson.title }}
          </h2>
          <p class="leading-loose">
            <base-safe-html :html="lesson.text" />
          </p>
        </div>
      </div>
    </base-container>
  </section>
</template>
