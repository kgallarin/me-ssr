<script setup lang="ts">
  import type { NavLink } from '@/types/Props.ts';
  import BaseContainer from '@components/base/BaseContainer.vue';
  import AnimatedLogo from '@components/motion/AnimatedLogo.vue';
  import ScalesOnPress from '@components/motion/ScalesOnPress.vue';
  import { THEME } from '~/assets/constants';
  import { useIconLinks } from '~/composables/icon-links/useIconLinks.ts';

  withDefaults(
    defineProps<{
      nav?: NavLink[];
      theme?: string;
      sidebarState?: boolean;
    }>(),
    {
      nav: () => [],
      theme: 'light',
      sidebarState: false,
    },
  );

  const emit = defineEmits<{
    (e: 'toggleTheme'): void;
    (e: 'openSidebar'): void;
  }>();

  const { icons } = useIconLinks();
  const iconLinks = computed(() =>
    icons.value.filter((link) => link.name === 'linkedIn' || link.name === 'github'),
  );

  const toggleTheme = () => emit('toggleTheme');
</script>

<template>
  <header data-testid="base-header-nav" class="base-header-nav-main bg-[#171717]">
    <base-container>
      <div class="header-inner flex h-16 items-center justify-between">
        <div class="w-[36px] sm:w-[44px]">
          <router-link data-testid="brand-logo" :to="{ name: 'home' }">
            <animated-logo />
          </router-link>
        </div>

        <!-- nav starts-->
        <nav class="hidden md:block">
          <ul class="text-md flex gap-8">
            <li v-for="item in nav" :key="item.label">
              <nuxt-link
                :to="{ path: item.to }"
                class="nav-link font-acumin flex items-center gap-2 font-normal hover:text-gray-300"
              >
                {{ item.label }}
              </nuxt-link>
            </li>
            <li
              v-for="(link, index) in iconLinks"
              :key="link.id"
              :class="[index === 0 ? 'socials pl-8' : 'pl-0']"
            >
              <nuxt-link :href="link.url" target="_blank">
                <fa-icon :icon="link.icon" class="text-2xl" />
              </nuxt-link>
            </li>

            <li class="theme-switcher pl-4">
              <button
                class="theme-toggle flex items-center text-gray-300 transition-colors hover:text-white cursor-pointer"
                :aria-label="
                  theme === THEME.DARK
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                "
                @click="toggleTheme"
              >
                <fa-icon
                  :icon="['far', 'lightbulb']"
                  :class="[
                    theme !== THEME.DARK ? 'text-yellow-primary' : 'text-gray-500',
                    'text-2xl',
                  ]"
                />
              </button>
            </li>
          </ul>
        </nav>

        <scales-on-press class="md:hidden">
          <a
            href="#"
            class="flex items-center justify-center text-2xl text-white focus:outline-none"
            aria-label="Open menu"
            @click.prevent.stop="emit('openSidebar')"
          >
            <fa-icon :icon="['fas', sidebarState ? 'sliders' : 'bars']" />
          </a>
        </scales-on-press>
      </div>
    </base-container>
  </header>
</template>

<style scoped></style>
