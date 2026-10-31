<script setup lang="ts">
  import { toRef } from 'vue';

  const props = withDefaults(
    defineProps<{
      html?: string;
    }>(),
    {
      html: '',
    },
  );

  const { parsedParts } = useSafeHtml(toRef(props, 'html'));
</script>

<template>
  <template v-for="(part, index) in parsedParts" :key="index">
    <br v-if="part.type === 'br'" />
    <a
      v-else-if="part.type === 'a'"
      :href="part.href"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-500 hover:underline"
    >
      {{ part.content }}
    </a>
    <strong v-else-if="part.type === 'strong'">
      {{ part.content }}
    </strong>
    <span v-else-if="part.type === 'span'" :class="part.class">
      {{ part.content }}
    </span>
    <template v-else>
      {{ part.text }}
    </template>
  </template>
</template>
