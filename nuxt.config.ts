// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: ['~/assets/styles/app.css'],

  app: {
    head: {
      link: [
        // Modern SVG Icon
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },

        // Standard Legacy Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

        // Apple Touch Icon (iOS Safari)
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@app': fileURLToPath(new URL('./app', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
    '@partials': fileURLToPath(new URL('./app/partials', import.meta.url)),
    '@store': fileURLToPath(new URL('./app/stores', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
  },

  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/image'],

  router: {
    options: {
      linkExactActiveClass: 'active',
      linkActiveClass: 'active-parent',
    },
  },

  runtimeConfig: {
    public: {
      siteName: 'kgallarin',
      appUrl: '',
    },
    graphqlUrl: process.env.NUXT_GRAPHQL_URL || 'http://kgdev-backend.test/graphql',
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
