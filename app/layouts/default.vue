<script setup lang="ts">
  import Footer from '@components/layout/Footer.vue';
  import Header from '@components/layout/Header.vue';
  import { useThemeStore } from '@store/modules/theme.ts';

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
</script>

<template>
  <div data-testid="default-layout">
    <Header
      :nav="defaultNav"
      :sidebar-state="false"
      :theme="themeState"
      @toggle-theme="toggleTheme"
      @open-sidebar="() => {}"
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
