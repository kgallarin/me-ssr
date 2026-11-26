<script setup lang="ts">
  import { computed } from 'vue';

  import type { IconLink } from '@/types/Icons.ts';
  import Footer from '@components/layout/Footer.vue';
  import Header from '@components/layout/Header.vue';
  import Sidebar from '@components/layout/Sidebar.vue';
  import PagePaginationOnScrollButtons from '@components/motion/PagePaginationOnScrollButtons.vue';
  import { useAppStore } from '@store/modules/app.ts';
  import { useThemeStore } from '@store/modules/theme.ts';
  import { useIconLinks } from '~/composables/icon-links/useIconLinks.ts';

  const defaultNav = [
    {
      label: 'home',
      to: '/',
      icon: 'chevron-right',
    },
    {
      label: 'about',
      to: '/about',
      icon: 'chevron-right',
    },
    {
      label: 'me',
      to: '/me',
      icon: 'chevron-right',
    },
    {
      label: 'contact',
      to: '/contact',
      icon: 'chevron-right',
    },
  ];

  const { timeNow, yearNow } = useLiveTime({
    timeZone: 'Asia/Singapore',
  });

  const themeStore = useThemeStore();
  const themeState = computed(() => themeStore.themeState);
  const toggleTheme = () => themeStore.toggleTheme();

  const appStore = useAppStore();

  const sidebarState = computed(() => appStore.sideBarState);
  const toggleSidebar = () => appStore.toggleSidebar();
  const closeSidebar = () => appStore.setSidebar(false);
  const toggleThemeAndClose = () => {
    closeSidebar();
    toggleTheme();
  };

  const { icons } = useIconLinks();
  const headerIconLinks = computed((): IconLink[] =>
    icons.value.filter((link) => link.name === 'linkedIn' || link.name === 'github'),
  );
  const sidebarIconLinks = computed(() =>
    icons.value.filter((link) => link.name !== 'resume'),
  );

  // pagination half-way scroll
  const footerRef = ref<ComponentPublicInstance | null>(null);
  const iconLinksReady = ref(true);
</script>

<template>
  <div data-testid="default-layout">
    <Header
      :nav="defaultNav"
      :sidebar-state="sidebarState"
      :theme="themeState"
      :icon-links="headerIconLinks"
      @toggle-theme="toggleTheme"
      @open-sidebar="toggleSidebar"
    />

    <!-- add more layout components if necessary -->
    <Sidebar
      :nav="defaultNav"
      :theme="themeState"
      :time-now="timeNow"
      :sidebar-state="sidebarState"
      :icon-links="sidebarIconLinks"
      @toggle-theme="toggleThemeAndClose"
      @close-sidebar="closeSidebar"
    />

    <page-pagination-on-scroll-buttons
      :boundary-ref="footerRef"
      :is-ready="iconLinksReady"
    />
    <!-- router-view here -->
    <div class="flex flex-1 flex-col">
      <slot />
    </div>

    <Footer
      ref="footerRef"
      :nav="defaultNav"
      :year-now="yearNow"
      :time-now="timeNow"
      @toggle-theme="toggleTheme"
    />
  </div>
</template>
