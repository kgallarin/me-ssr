<script setup lang="ts">
  import { computed } from 'vue';

  import ContactForm from '@components/form/ContactForm.vue';
  import ContactMe from '@partials/contact/ContactMe.vue';
  import { useIconLinks } from '~/composables/icon-links/useIconLinks.ts';

  const { fetchContentSingle } = useFetchContent();

  const contactFetch = fetchContentSingle('contact');
  const contactContent = computed(() => contactFetch.item?.value);

  const { icons } = useIconLinks();
</script>

<template>
  <contact-me :icon-links="icons" :content="contactContent" />
  <div class="flex flex-1 flex-col">
    <section class="shadow-bottom flex-1 bg-gray-lighter shadow-custom-mid-inset">
      <!--	form starts-->
      <contact-form />
    </section>
  </div>
</template>
