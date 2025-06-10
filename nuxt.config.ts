// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Nuxt 3 Task Manager',
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
});
