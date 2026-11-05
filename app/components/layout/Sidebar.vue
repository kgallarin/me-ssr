<script setup lang="ts">
  import { computed, ref } from 'vue';

  import type { AppTheme } from '@/types/App.ts';
  import type { NavLink } from '@/types/Props.ts';
  import AnimatedLogo from '@components/motion/AnimatedLogo.vue';
  import ScalesOnPress from '@components/motion/ScalesOnPress.vue';
  import StaggeringVerticalNav from '@components/motion/sidebar/StaggeringVerticalNav.vue';
  import { onClickOutside } from '@vueuse/core';
  import { stagger } from 'motion-v';
  import { motion } from 'motion-v';
  import { THEME } from '~/assets/constants';
  import { useIconLinks } from '~/composables/icon-links/useIconLinks.ts';

  const props = withDefaults(
    defineProps<{
      nav?: NavLink[];
      theme?: AppTheme;
      sidebarState?: boolean;
      timeNow?: string;
    }>(),
    {
      nav: () => [],
      theme: 'light',
      sidebarState: false,
      timeNow: '',
    },
  );

  const isSidebarOpen = computed((): boolean => props.sidebarState);

  const { icons } = useIconLinks();
  const iconLinks = computed(() =>
    icons.value.filter((link) => link.name !== 'resume'),
  );

  const emit = defineEmits<{
    (e: 'toggle-theme'): void;
    (e: 'close-sidebar'): void;
  }>();

  const closeSidebar = () => emit('close-sidebar');
  const toggleTheme = () => emit('toggle-theme');

  // const navigateTo = (to: string) => {
  //   router.push({ name: to });
  //   appStore.closeSidebar();
  // };

  const sidebarMain = ref(null);
  onClickOutside(sidebarMain, () => {
    if (isSidebarOpen.value) {
      closeSidebar();
    }
  });

  const iconLinksContainerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1, { startDelay: 0.5 }),
      },
    },
  };

  const iconLinksItemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  };
</script>

<template>
  <motion.nav
    initial="closed"
    :animate="isSidebarOpen ? 'open' : 'closed'"
    class="nav container fixed left-0 top-0 z-70 h-full w-full"
    :class="{
      'shadow-inner drop-shadow-xl': isSidebarOpen,
      'pointer-events-none': !isSidebarOpen,
    }"
  >
    <div
      ref="sidebarMain"
      class="sidebar-main h-full transition-opacity duration-300"
    >
      <staggering-vertical-nav
        :theme="theme"
        :nav-items="nav"
        :is-open="isSidebarOpen"
        @close="closeSidebar"
      >
        <template
          #stagger-nav-slot="{ variants: { containerVariants, itemVariants } }"
        >
          <!-- Navigation (sample items) -->
          <motion.ul class="list" :variants="containerVariants">
            <motion.li
              v-for="(navItem, index) in nav"
              :key="index - 1"
              class="list-item"
              :variants="itemVariants"
              :while-press="{ scale: 0.95 }"
            >
              <nuxt-link
                :to="{ path: navItem.to }"
                class="nav-link flex w-full items-center justify-between pb-2 text-sm text-secondary"
                @click.prevent.stop="closeSidebar"
              >
                <span>
                  {{ navItem.label }}
                </span>

                <span>
                  <fa-icon
                    class="text-xs text-gray-200"
                    :icon="['fas', navItem.icon]"
                  />
                </span>
              </nuxt-link>
            </motion.li>
          </motion.ul>

          <motion.ul
            v-if="iconLinks.length > 0"
            ref="icon-links"
            class="absolute bottom-12 left-0 z-50 flex w-full justify-between gap-8 text-xl"
            :variants="iconLinksContainerVariants"
          >
            <div class="flex gap-4 pl-5">
              <motion.li
                v-for="link in iconLinks"
                :key="link.id"
                class="pl-0"
                :variants="iconLinksItemVariants"
              >
                <a
                  :href="link.url"
                  target="_blank"
                  class="flex flex-col items-center"
                >
                  <fa-icon :icon="link.icon" class="text-2xl text-primary" />
                  <span class="text-[6px]">{{ link.name }}</span>
                </a>
              </motion.li>
            </div>

            <motion.li class="mr-5" :variants="iconLinksItemVariants">
              <button
                class="flex flex-col items-center text-primary"
                :aria-label="
                  theme === THEME.DARK
                    ? 'let there be light'
                    : 'come to the dark side, we have pizza'
                "
                @click="toggleTheme"
              >
                <fa-icon
                  :icon="['fas', theme === THEME.DARK ? 'sun' : 'moon']"
                  class="text-2xl"
                />
                <span class="text-[6px]">{{
                  theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
                }}</span>
              </button>
            </motion.li>

            <motion.li
              class="absolute -bottom-7 right-5"
              :variants="iconLinksItemVariants"
            >
              <p
                class="flex items-center pt-2 font-proxima text-sm font-light text-primary"
              >
                <fa-icon :icon="['far', 'clock']" class="mr-1 text-sm" />
                {{ timeNow }}
              </p>
            </motion.li>
          </motion.ul>
          <div
            class="absolute left-0 top-0 flex w-full cursor-pointer items-center justify-center p-[6px_6px_6px_16px] text-xl"
          >
            <div class="flex w-full items-center justify-between">
              <div v-if="isSidebarOpen" class="h-[36px] w-[36px] sm:w-[44px]">
                <animated-logo class="block" :for-light="theme === THEME.LIGHT" />
              </div>

              <scales-on-press>
                <div
                  v-if="isSidebarOpen"
                  data-testid="close-sidebar"
                  class="p-3"
                  @click.prevent.stop="closeSidebar"
                >
                  <fa-icon :icon="['fas', 'times']" class="text-primary" />
                </div>
              </scales-on-press>
            </div>
          </div>
        </template>
      </staggering-vertical-nav>
    </div>
  </motion.nav>
</template>
