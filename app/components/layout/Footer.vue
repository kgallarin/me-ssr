<script setup lang="ts">
  import type { NavLink } from '@/types/Props.ts';
  import { useIconLinks } from '~/composables/icon-links/useIconLinks.ts';

  withDefaults(
    defineProps<{
      nav?: NavLink[];
      theme?: string;
      yearNow?: number;
      timeNow?: string;
    }>(),
    {
      nav: () => [],
      theme: 'light',
      yearNow: 0,
      timeNow: '',
    },
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const emit = defineEmits<{
    (e: 'toggleTheme'): void;
  }>();

  const { icons } = useIconLinks();
  const iconLinks = computed(() =>
    icons.value.filter((link) => link.name === 'linkedIn' || link.name === 'github'),
  );
</script>

<template>
  <div
    class="footer-main relative mt-auto border border-t border-gray-secondary bg-gray-lighter p-8"
  >
    <a
      href="#"
      class="absolute -top-8 left-0 right-0 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-t border-gray-secondary bg-gray-lighter md:-top-11 md:h-24 md:w-24"
      @click.prevent="scrollToTop"
    >
      <fa-icon
        :icon="['fa', 'chevron-up']"
        class="relative -top-2 text-4xl text-tertiary md:-top-5"
      />
    </a>

    <div
      class="inner mx-auto flex flex-col justify-center md:flex-row md:justify-between lg:max-w-screen-xl"
    >
      <div class="flex flex-col items-center gap-4 md:items-start">
        <p class="font-proxima text-sm font-light text-primary">
          &copy; {{ yearNow }} Kevin Gallarin
        </p>
        <div class="flex gap-4">
          <nuxt-link
            v-for="link in iconLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            class="text-primary hover:text-gray-500"
          >
            <fa-icon :icon="link.icon" class="text-xl" />
          </nuxt-link>
        </div>
      </div>

      <!-- nav starts-->
      <div class="flex flex-col items-center md:items-end">
        <button
          class="theme-toggle cursor-pointer flex items-center py-4 text-gray-300 transition-colors hover:text-white md:hidden"
          :aria-label="
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          "
          @click="emit('toggleTheme')"
        >
          <fa-icon
            :icon="['far', 'lightbulb']"
            :class="[
              theme !== 'dark' ? 'bg-black/80 text-yellow-400' : 'text-gray-500',
              'h-5 w-5 rounded-full p-2 text-2xl cursor-pointer',
            ]"
          />
        </button>
        <nav class="hidden md:block">
          <ul class="text-md flex gap-8 text-primary">
            <li v-for="item in nav" :key="item.label">
              <nuxt-link
                :to="{ path: item.to }"
                class="nav-link flex items-center gap-2 font-acumin font-normal hover:text-gray-500"
                exact-active-class="active"
              >
                {{ item.label }}
              </nuxt-link>
            </li>
            <li class="theme-switcher relative -top-2">
              <button
                class="theme-toggle flex items-center text-gray-300 transition-colors hover:text-white cursor-pointer"
                :aria-label="
                  theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
                "
                @click="emit('toggleTheme')"
              >
                <fa-icon
                  :icon="['far', 'lightbulb']"
                  :class="[
                    theme !== 'dark'
                      ? 'bg-black/80 text-yellow-400'
                      : 'text-gray-500',
                    'h-5 w-5 rounded-full p-2 text-2xl',
                  ]"
                />
              </button>
            </li>
          </ul>
        </nav>
        <p class="mt-2 text-center font-proxima text-xs">
          Created with
          <fa-icon :icon="['fa', 'heart']" class="text-red-600 shadow-sm" />, KG
        </p>
        <p
          class="flex items-center pt-2 font-proxima text-sm font-light text-primary"
        >
          <fa-icon :icon="['far', 'clock']" class="mr-1 text-sm" />
          {{ timeNow }}
        </p>
      </div>
    </div>
  </div>
</template>
