<script setup lang="ts">
  import Footer from '@components/layout/Footer.vue';
  import Header from '@components/layout/Header.vue';

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
</script>

<template>
  <div data-testid="default-layout">
    <!--    @todo: theme + actions-->
    <Header
      :nav="defaultNav"
      :sidebar-state="false"
      theme="light"
      @toggle-theme="() => {}"
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
    />
  </div>
</template>
