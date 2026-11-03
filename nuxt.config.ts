// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: ['~/assets/styles/app.css'],

  app: {
    head: {
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
