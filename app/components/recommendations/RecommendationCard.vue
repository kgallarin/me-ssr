<script setup lang="ts">
  import { nextTick, ref } from 'vue';

  import type { Testimonial } from '@/types/Recommendations.ts';

  defineProps<{
    testimonial: Testimonial | null | undefined;
    appTheme?: string;
  }>();

  const cardRef = ref<HTMLElement | null>(null);
  const isExpanded = ref(false);

  const toggleExpand = async () => {
    isExpanded.value = !isExpanded.value;

    if (isExpanded.value) {
      await nextTick();
      cardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
</script>

<template>
  <div
    ref="cardRef"
    class="main-card relative flex flex-col rounded-md border border-gray-200 p-4 py-8 text-primary shadow-md"
    :class="
      isExpanded ? 'max-h-fit w-full' : 'h-[340px] w-full overflow-hidden pb-2'
    "
  >
    <fa-icon
      v-if="testimonial?.linkedIn"
      class="text-md absolute right-3 top-3 rounded-sm text-[#0982c0]"
      :class="appTheme === 'dark' ? 'bg-white py-[1px]' : ''"
      :icon="['fab', 'linkedin']"
    />
    <div class="mt-2 flex justify-between border-b border-gray-200 pb-4">
      <div class="author flex flex-row items-center gap-3 leading-tight">
        <base-image
          :src="testimonial?.avatar ? testimonial?.avatar.url : ''"
          class="h-12 w-12 object-contain"
          rounded="rounded-full"
          :alt="testimonial?.avatar ? testimonial?.avatar.alt : ''"
        />
        <div class="flex flex-col text-left">
          <p class="mb-0 leading-tight">{{ testimonial?.author }}</p>
          <p class="text-xs">{{ testimonial?.title }}</p>
        </div>
      </div>

      <div>
        <fa-icon
          v-for="i in testimonial?.rating"
          :key="i"
          class="inline-block text-xs text-yellow-400"
          :icon="['fas', 'star']"
        />
      </div>
    </div>

    <p class="text-content pb-4 pt-10 leading-loose">
      <base-safe-html :html="testimonial?.text" />
    </p>

    <div
      v-if="!isExpanded"
      class="via-secondary/85 absolute bottom-0 left-0 flex w-full justify-center bg-gradient-to-t from-secondary to-transparent pb-4 pt-24"
    >
      <button
        class="text-xs font-semibold text-blue-500 hover:underline"
        @click="toggleExpand"
      >
        read more
      </button>
    </div>

    <div v-else class="mt-auto flex justify-center pb-4">
      <button
        class="text-xs font-semibold text-blue-500 hover:underline"
        @click="toggleExpand"
      >
        show less
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .text-content {
    position: relative;
    &:before,
    &:after {
      font-size: 2.5rem;
      line-height: 0;
    }

    &:before {
      content: open-quote;
      top: 0;
      left: 0;
    }

    &:after {
      position: absolute;
      right: 0;
      bottom: 35px;
      content: close-quote;
    }
  }
</style>
