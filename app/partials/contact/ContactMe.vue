<script setup lang="ts">
  import type { AppTheme } from '@/types/App.ts';
  import type { IconLink } from '@/types/Icons.ts';
  import type { PageTextContent } from '@/types/PageTextContent.ts';

  withDefaults(
    defineProps<{
      content?: PageTextContent | null;
      links?: IconLink[] | null;
      theme?: AppTheme;
    }>(),
    {
      content: null,
      links: () => [],
      theme: 'light',
    },
  );
</script>

<template>
  <section class="bg-gray-lighter">
    <base-container>
      <div
        class="flex w-full flex-col items-center justify-between border-b border-secondary py-6 md:flex-row md:py-8 lg:py-16"
      >
        <div class="w-full text-balance text-primary md:w-5/12">
          <h1 class="mb-4 text-6xl lowercase tracking-tight text-tertiary">
            {{ content?.content?.[0]?.title || content?.title }}
          </h1>
          <p class="mb-4 font-acumin text-xl font-light">
            {{ content?.subtitle }}
          </p>
          <div
            v-for="(section, index) in content?.content"
            :key="index"
            class="mb-4"
          >
            <h2 v-if="section.title" class="mb-2 text-2xl font-semibold">
              {{ section.title }}
            </h2>
            <p class="font-proxima text-base font-light leading-relaxed">
              <base-safe-html :html="section.text" />
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-8">
            <nuxt-link
              v-for="link in links"
              :key="link.name"
              :href="link.url"
              :download="link.name === 'resume' ? 'resume.pdf' : undefined"
              target="_blank"
              class="mb-4 flex flex-col items-center gap-2 text-center sm:flex-row"
              :class="[
                { [link.classColor]: link.name === 'linkedIn' && theme === 'light' },
                {
                  'justify-center hover:underline': link.name === 'resume',
                },
              ]"
            >
              <fa-icon :icon="link.icon" class="text-6xl md:mr-2" />
              <p class="capitalize leading-tight">
                {{ link.name === 'resume' ? 'Download my resume' : link.name }}
              </p>
            </nuxt-link>
          </div>
        </div>

        <div class="w-full justify-self-end pt-8 md:w-1/2">
          <base-image
            class="object-cover"
            rounded="rounded-md"
            :src="content?.heroImages[0]?.url ?? ''"
            :alt="content?.heroImages[0]?.alt ?? ''"
            show-loader
          />
        </div>
      </div>
    </base-container>
  </section>
</template>
